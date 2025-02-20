import { Divider, Stack, Form, Grid, Row, Col, Checkbox, ButtonToolbar, Button } from "rsuite";
import classes from './index.module.css';
import ErrorBoundaryLayout from "../../../layouts/ErrorBoundaryLayout";
import PanelCardContainer from "../../../components/MainCards/PanelCardContainer";
import { useIndustryAccountQuery } from "../../../hooks/data/profile";
import { useIndustryPaymentPaidYearQuery } from "../../../hooks/data/industry_payment";
import { paymentFormInitialValues, paymentFormSchema, PaymentFormSchemaType } from "./schema";
import { useMemo, useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { useAxios } from "../../../hooks/useAxios";
import { yupResolver } from "@hookform/resolvers/yup";
import { api_routes } from "../../../utils/routes/api";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType } from "../../../utils/types";
import { Controller, useForm } from "react-hook-form";
import ModalCardContainer from "../../../components/MainCards/ModalCardContainer";
import SelectInput from "../../../components/FormInput/SelectInput";
import moment from "moment";
import TextInput from "../../../components/FormInput/TextInput";
import FileInput from "../../../components/FormInput/FileInput";
import { company_act, Contract_Labour_Act, Factory_Act, Shops_and_Commercial_Act, Society_Registration_Act } from "../../../utils/constants/company_act";

const isAfter31stDec = moment().isAfter(moment().year() + "-12-31", "day");

const diff = moment().year() - (isAfter31stDec ? 2016 : 2017);

const years = Array.from({ length: diff }, (_, i) => ({ label: (moment().year() - (isAfter31stDec ? i : (i + 1))).toString(), value: (moment().year() - (isAfter31stDec ? i : (i + 1))).toString() }));

export default function MakePaymentPage() {
	const [loading, setLoading] = useState<boolean>(false);
	const { toastError } = useToast();
	const axios = useAxios();

	const {
		data: account_info,
		isLoading: isAccountLoading,
		isFetching: isAccountFetching,
		isRefetching: isAccountRefetching,
		refetch: accountRefetch,
		error: accountError,
	} = useIndustryAccountQuery(true);

	const {
		control,
		handleSubmit,
		reset,
		watch,
		getValues,
		setError,
		setValue,
		formState: { errors },
	} = useForm<PaymentFormSchemaType>({
		resolver: yupResolver(paymentFormSchema),
		shouldFocusError: true,
		values: {
			...paymentFormInitialValues,
			act: account_info ? account_info.industry.act.toString() : "",
			category: account_info ? (account_info.industry.category || "") : "",
		}
	});

	const { data, isFetching, isLoading, isRefetching, refetch } = useIndustryPaymentPaidYearQuery(true);

	const selectedYear = watch("year");
	const maleCount = watch("male");
	const femaleCount = watch("female");
	const act = watch("act");
	
	const categories = useMemo(() => {
			if (act === "1") {
					return Shops_and_Commercial_Act;
			} else if (act === "2") {
					return Factory_Act;
			} else if (act === "3") {
					return Society_Registration_Act;
			} else if (act === "4") {
					return Contract_Labour_Act;
			}
			return [];
	}, [act]);

	const amount = useMemo(() => (+maleCount + +femaleCount) * 60, [maleCount, femaleCount]);

	const interest = useMemo(() => {
		if (!selectedYear) {
			return 0;
		}
		const curDay = moment().date();
		const curMonth = moment().month() + 1;
		const curYear = moment().year();
		const diff = curYear - selectedYear;
		const month_diff = moment((curYear-1) + "-" + curMonth + "-" + curDay).diff(moment(selectedYear + "-01-01"), "months", true);
		if (diff == 0 || diff == 1) {
			if (curMonth == 1 && curDay >= 1 && curDay <= 15) {
				return 0;
			}else if ((curMonth == 1 && curDay >= 16) || (curMonth <= 3 && curDay <= 31)) {
				return (((amount * 12) / 100) / 12) * Math.ceil(month_diff);
			}else {
				return (((amount * 18) / 100) / 12) * Math.ceil(month_diff);
			}
		}
		return (((amount * 18) / 100) / 12) * Math.ceil(month_diff);
	}, [amount, selectedYear]);

	const totalAmount = useMemo(() => {
		return +amount + +interest;
	}, [amount, interest]);

	const requiredNoOfEmployees = useMemo(() => {
		if (act === "1") {
			return 50;
		} else if (act === "2") {
				return 10;
		} else if (act === "3") {
				return 50;
		} else if (act === "4") {
				return 20;
		}
		return undefined;
	},[act]);

	const onSubmit = handleSubmit(async () => {
		if(maleCount === 0 && femaleCount === 0){
			toastError("Both male and female employees cannot be 0");
			return;
		}
		if(requiredNoOfEmployees===undefined){
			toastError("Please select Act");
			return;
		}
		if((+maleCount + +femaleCount) < requiredNoOfEmployees){
			toastError("Minimum of "+requiredNoOfEmployees+" employees in total is required to be eligible for contribution.");
			return;
		}
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("act", getValues().act.toString());
			formData.append("category", getValues().category.toString());
			formData.append("year", getValues().year.toString());
			formData.append("male", getValues().male.toString());
			formData.append("female", getValues().female.toString());
			formData.append("price", totalAmount.toString());
			formData.append("interest", interest.toString());
			if (getValues().employee_excel && getValues().employee_excel !== undefined && getValues().employee_excel!.length > 0 && getValues().employee_excel![getValues().employee_excel!.length - 1 || 0].blobFile) {
				formData.append("employee_excel", getValues().employee_excel![getValues().employee_excel!.length - 1 || 0].blobFile!);
			}
			const resp = await axios.post<{data: string}>(api_routes.industry.payment.make_payment, formData);
			window.open(resp.data.data, "_self");
			await refetch();
			await accountRefetch();
			reset({
				...paymentFormInitialValues,
				act: account_info ? account_info.industry.act.toString() : "",
				category: account_info ? (account_info.industry.category || "") : "",
			});
		} catch (error) {
			if (isAxiosError<AxiosErrorResponseType>(error)) {
				if (error?.response?.data?.errors) {
					for (const [key, value] of Object.entries(error?.response?.data?.errors)) {
						setError(key as keyof PaymentFormSchemaType, {
							type: "server",
							message: value[0],
						});
					}
				}
				if (error?.response?.data?.message) {
					toastError(error.response.data.message);
				}
			}
		} finally {
			setLoading(false);
		}
	});


	return <div className="data-table-container">
		<PanelCardContainer
			header={
				<Stack justifyContent="center" alignItems="center">
					<div className="text-center">
						<h1 className={classes.main_heading}>Make Payment</h1>
					</div>
				</Stack>
			}
		>
			<Divider />
			<ErrorBoundaryLayout loading={isAccountLoading || isAccountFetching || isAccountRefetching} error={accountError} refetch={accountRefetch}>
				<div style={{ width: "100%", position: "relative" }}>
					<Form onSubmit={() => onSubmit()} style={{ width: '100%' }}>
						<Form.Group>
							<div className="mb-1">
								<ModalCardContainer
									header={
										<div className="text-center">
											<h5 className={classes.inner_main_heading}>Payment Form</h5>
										</div>
									}
								>
									<Grid fluid>
										<Row gutter={30}>
											<Col className="pb-1"  sm={24} xs={24}>
												<Form.ControlLabel>Company Name</Form.ControlLabel>
												<Form.Control name="company_name" value={account_info?.industry.name} disabled={true} />
											</Col>
										</Row>
										<Row gutter={30}>
											<Col className="pb-1" md={8} sm={24} xs={24}>
													<SelectInput
															name="act"
															label="Act"
															data={company_act}
															control={control}
															error={errors.act?.message}
															resetHandler={() => setValue("category", "")}
													/>
											</Col>
											<Col className="pb-1" md={8} sm={24} xs={24}>
													<SelectInput
															name="category"
															label="Category"
															virtualized={false}
															data={categories}
															control={control}
															error={errors.category?.message}
													/>
											</Col>
											<Col className="pb-1" md={8} sm={24} xs={24}>
												<SelectInput
													name="year"
													label="Year"
													data={years.filter((year) => !data?.includes(Number(year.value))).map((year) => ({ label: year.label, value: year.value }))}
													control={control}
													error={errors.year?.message}
													loading={isLoading || isFetching || isRefetching}
												/>
											</Col>
										</Row>
										<Row gutter={30}>
											<Col className="pb-1" md={8} sm={24} xs={24}>
												<TextInput
													name="male"
													label="No. of Male Employees"
													type="number"
													control={control}
													error={errors.male?.message}
												/>
											</Col>
											<Col className="pb-1" md={8} sm={24} xs={24}>
												<TextInput
													name="female"
													label="No. of Female Employees"
													type="number"
													control={control}
													error={errors.female?.message}
												/>
											</Col>
											<Col className="pb-1" md={8} sm={24} xs={24}>
												<div>
													<FileInput
														name="employee_excel"
														accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
														label="Attach Your Employee Detail Excel Sheet"
														helpText=" Only XLSX files are allowed"
														control={control}
														error={errors.employee_excel?.message}
													/>
												</div>
											</Col>
										</Row>
									</Grid>
									<Grid fluid>
										<Row gutter={30}>
											<Col className="pb-1 pt-1"  sm={24} xs={24}>
											<div className={classes.table_container}>
												<table className={classes.table} border={1}>
													<thead>
														{requiredNoOfEmployees !== undefined && (<tr className={classes.bg_indigo}>
															<th colSpan={5}>Minimum of {requiredNoOfEmployees} employees in total is required to be eligible for contribution.</th>
														</tr>)}
														<tr>
															<th>No. of Male</th>
															<th>No. of Female</th>
															<th>Total Employees</th>
															<th>Unit Price</th>
															<th>Amount</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>{maleCount || 0}</td>
															<td>{femaleCount || 0}</td>
															<td>{+maleCount + +femaleCount}</td>
															<td>₹60</td>
															<td>₹{amount}</td>
														</tr>
														<tr className={classes.bg_grey}>
															<th>Interest</th>
															<th colSpan={3}></th>
															<th>₹{interest}</th>
														</tr>
														<tr className={classes.bg_grey2}>
															<th>Total</th>
															<th colSpan={3}></th>
															<th>₹{totalAmount}</th>
														</tr>
													</tbody>
												</table>
											</div>
											</Col>
										</Row>
									</Grid>
									<Grid fluid>
										<Row gutter={30}>
											<Col  sm={24} xs={24}>
												<Form.ControlLabel><b>Note:</b></Form.ControlLabel>
											</Col>
											<Col  sm={24} xs={24}>
												<div>
													<Controller
														name="term1"
														control={control}
														render={({ field }) => (
															<>
																<Checkbox checked={field.value} onChange={() => field.onChange(!field.value)}>I understand that my transaction does not qualify for any chargeback claims</Checkbox>
																<Form.ErrorMessage show={!!errors.term1?.message} placement="bottomStart">
																	{errors.term1?.message}
																</Form.ErrorMessage>
															</>
														)}
													/>
												</div>
												<div>
													<Controller
														name="term2"
														control={control}
														render={({ field }) => (
															<>
																<Checkbox checked={field.value} onChange={() => field.onChange(!field.value)}>I Accept that any chargebackis not automatic and for any chargeback claim the concerned government department shall be approached.</Checkbox>
																<Form.ErrorMessage show={!!errors.term1?.message} placement="bottomStart">
																	{errors.term1?.message}
																</Form.ErrorMessage>
															</>
														)}
													/>
												</div>
											</Col>
										</Row>
									</Grid>
								</ModalCardContainer>
							</div>
							<ButtonToolbar style={{ width: '100%', justifyContent: 'flex-start', gap: '5px' }}>
								<Button appearance="primary" size='md' type="submit" loading={loading} disabled={loading}>Pay</Button>
								<Button appearance="primary" color="red" size='md' type="button" onClick={() => reset(paymentFormInitialValues)}>Reset</Button>
							</ButtonToolbar>
						</Form.Group>
					</Form>
				</div>
			</ErrorBoundaryLayout>
		</PanelCardContainer>
	</div>
}