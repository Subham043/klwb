import { Button, Dropdown } from 'rsuite'
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import MenuIcon from '@rsuite/icons/Menu';
import UserInfoIcon from '@rsuite/icons/UserInfo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderToggle = (props: any) => (
  <Button {...props} appearance="default"><UserInfoIcon /></Button>
);
export default function DashboardMenu({expand, setExpand}:{expand: boolean, setExpand: React.Dispatch<React.SetStateAction<boolean>>}) {
    return <div className="container">
        <div className="row justify-between align-center py-1">
            <div className="col-auto">
                <Button onClick={() => setExpand(!expand)} appearance="default">{expand ? <WarningRoundIcon /> : <MenuIcon />}</Button>
            </div>
            <div className="col-auto">
                <Dropdown renderToggle={renderToggle}>
                    <Dropdown.Item>Account Settings</Dropdown.Item>
                    <Dropdown.Item>Change Password</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    </div>
}