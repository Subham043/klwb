import { Button, Dropdown } from 'rsuite'
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import MenuIcon from '@rsuite/icons/Menu';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { page_routes } from '../../utils/page_routes';
import api from '../../utils/axios';
import { api_routes } from '../../utils/api_routes';
import { useAccountModal } from '../../hooks/useAccountModal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderToggle = (props: any) => (
  <Button {...props} appearance="default"><UserInfoIcon /></Button>
);
export default function DashboardMenu({expand, setExpand}:{expand: boolean, setExpand: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [loading, setLoading] = useState<boolean>(false);
    const {toastError, toastSuccess} = useToast();
    const {removeUser} = useUser();
    const {toggleAccountModal} = useAccountModal();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        setLoading(true);
        try {
            await api.get(api_routes.auth.logout);
            removeUser();
            toastSuccess("Logged Out Successful");
            navigate(page_routes.auth.login, {replace: true});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toastError(error?.response?.data?.message);
            }
        }finally {
            setLoading(false);
        }
    };

    return <div className="container">
        <div className="row justify-between align-center py-1">
            <div className="col-auto">
                <Button onClick={() => setExpand(!expand)} appearance="default">{expand ? <WarningRoundIcon /> : <MenuIcon />}</Button>
            </div>
            <div className="col-auto">
                <Dropdown renderToggle={renderToggle}>
                    <Dropdown.Item onClick={()=>toggleAccountModal(true)}>Account Settings</Dropdown.Item>
                    <Dropdown.Item disabled={loading} onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    </div>
}