import { FC, useEffect, useState } from "react"
import { AuthType } from "../../utils/types";
import PageLoader from "../../components/PageLoader";
import { useUser } from "../../hooks/useUser";
import api from "../../utils/config/axios";
import SuspenseOutlet from "../../components/SuspenseOutlet";
import { api_routes } from "../../utils/routes/api";

type PersistLayoutProps = {
  profile_api_link?:string
}
/*
  * Layout that checks auth token is valid or not. if valid then persist user data or token else invalidate existing auth token
*/
const PersistLayout:FC<PersistLayoutProps> = ({profile_api_link = api_routes.user.account.profile}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const { setUser, removeUser } = useUser();

    
    useEffect(() => {
        let isMounted = true;
        const checkUserAuthenticated = async () => {
            try {
                const response = await api.get<{profile:AuthType}>(profile_api_link);
                setUser(response.data.profile);
            } catch (error) {
                removeUser();
            } finally {
                isMounted && setLoading(false)
            }
        }
        
        isMounted ? checkUserAuthenticated() : setLoading(false)

        return () => {isMounted = false; checkUserAuthenticated()};

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            {
                loading ? <PageLoader display /> : <SuspenseOutlet />
            }
        </>
    )
}

export const AdminPersistLayout = () => <PersistLayout profile_api_link={api_routes.admin.account.profile} />
export const StudentPersistLayout = () => <PersistLayout profile_api_link={api_routes.user.account.profile} />
export const InstitutePersistLayout = () => <PersistLayout profile_api_link={api_routes.institute.account.profile} />