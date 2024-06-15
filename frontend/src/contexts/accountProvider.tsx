import React, { createContext, useCallback, useState } from "react";
import { ChildrenType } from "../utils/types";
import { Modal, Tabs } from "rsuite";
import PasswordUpdate from "../components/Account/PasswordUpdate";
import ProfileUpdate from "../components/Account/ProfileUpdate";

/*
  * User Context Type
*/
type AccountContextType = {
    displayAccountModal: boolean;
    toggleAccountModal: (data:boolean) => void;
}

/*
  * User Context Default Value
*/
const accountDefaultValues: AccountContextType = {
    displayAccountModal: false,
    toggleAccountModal: () => {},
};

/*
  * User Context
*/
export const AccountContext = createContext<AccountContextType>(accountDefaultValues);

/*
  * User Provider
*/
const AccountProvider: React.FC<ChildrenType> = ({ children }) => {
  const [displayAccountModal, setDisplayAccountModal] = useState<boolean>(false);

  /*
   * Function for setting user state
   */
  const toggleAccountModal = useCallback((data: boolean) => {
    setDisplayAccountModal(data);
  }, []);


  return (
    <AccountContext.Provider
      value={{ 
        displayAccountModal, 
        toggleAccountModal
      }}
    >
        {children}
        <Modal size={'sm'} open={displayAccountModal} onClose={() => setDisplayAccountModal(false)}>
            <Modal.Header>
            <Modal.Title>Account Setting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="1">
                    <Tabs.Tab eventKey="1" title="Profile">
                        <div style={{padding: '20px 10px', border: '1px solid #ccc', borderTop: 'none'}}>
                            <ProfileUpdate display={displayAccountModal} />
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab eventKey="2" title="Password">
                        <div style={{padding: '20px 10px', border: '1px solid #ccc', borderTop: 'none'}}>
                            <PasswordUpdate />
                        </div>
                    </Tabs.Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    </AccountContext.Provider>
  );
};

export default AccountProvider;