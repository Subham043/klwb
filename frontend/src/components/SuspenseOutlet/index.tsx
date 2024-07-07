import { FC, Suspense } from "react"
import { Outlet } from "react-router-dom"
import PageLoader from "../../components/PageLoader";

const SuspenseOutlet:FC = () => {
    return (
					<Suspense fallback={<PageLoader display />}>
							<Outlet />
					</Suspense>
    )
}

export default SuspenseOutlet