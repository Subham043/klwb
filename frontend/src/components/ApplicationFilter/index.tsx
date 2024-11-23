import { Button, Drawer } from "rsuite";
import SelectCityStatus from "../SelectCity";
import SelectTaluqStatus from "../SelectTaluq";
import SelectGraduationStatus from "../SelectGraduation";
import SelectCourseStatus from "../SelectCourse";
import SelectClassStatus from "../SelectClass";
import SelectYear from "../Institute/SelectYear";
import SelectCategory from "../SelectCategory";
import SelectGender from "../SelectGender";
import { useSearchParams } from "react-router-dom";


export default function ApplicationFilter({
  drawer,
  drawerHandler,
}: {
  drawer: boolean;
  drawerHandler: (value: boolean) => void;
}) {

  const [searchParams, setSearchParams] = useSearchParams();

  const clearFilterHandler = () => {
    searchParams.delete("city_id");
    searchParams.delete("city_name");
    searchParams.delete("taluq_id");
    searchParams.delete("taluq_name");
    searchParams.delete("graduation_id");
    searchParams.delete("graduation_name");
    searchParams.delete("course_id");
    searchParams.delete("course_name");
    searchParams.delete("class_id");
    searchParams.delete("class_name");
    searchParams.delete("status");
    searchParams.delete("gender");
    searchParams.delete("category");
    searchParams.delete("year");
    setSearchParams(searchParams);
    drawerHandler(false);
  }

  return (
    <Drawer size="xs" open={drawer} onClose={() => drawerHandler(false)}>
      <Drawer.Header style={{ paddingRight: "1rem"}}>
        <Drawer.Title>Filters</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={clearFilterHandler} appearance="primary" color="red">
            Clear
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body className="px-2">
        <div className="w-100 mb-1" style={{ position: "relative", zIndex: 20}}>
          <SelectCityStatus />
        </div>
        <div className="w-100 mb-1" style={{ position: "relative", zIndex: 19}}>
          <SelectTaluqStatus />
        </div>
        <div className="w-100 mb-1" style={{ position: "relative", zIndex: 18}}>
          <SelectGraduationStatus />
        </div>
        <div className="w-100 mb-1" style={{ position: "relative", zIndex: 17}}>
          <SelectCourseStatus />
        </div>
        <div className="w-100 mb-1" style={{ position: "relative", zIndex: 16}}>
          <SelectClassStatus />
        </div>
        <div className="w-100 mb-1" style={{ position: "relative", zIndex: 15}}>
          <SelectCategory className="w-100" />
        </div>
        <div className="w-100 mb-1" style={{ position: "relative", zIndex: 15}}>
          <SelectGender className="w-100" />
        </div>
        <div className="w-100 mb-1" style={{ position: "relative", zIndex: 14}}>
          <SelectYear className="w-100" />
        </div>
      </Drawer.Body>
    </Drawer>
  );
}
