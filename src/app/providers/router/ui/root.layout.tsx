import { Link, Outlet } from '@tanstack/react-router';

export const RootLayout = () => {
    return (
        <>
            <h1>{import.meta.env.APP_TITLE}</h1>
            <ul>
                <li>
                    <Link to="/sign-in" children={'Sign In'} />
                </li>

                <li>
                    <Link to="/sign-up" children={'Sign Up'} />
                </li>

                <li>
                    <Link to="/" children={'Home'} />
                </li>

                <li>
                    <Link to="/admin" children={'Admin'} />
                </li>
            </ul>
            <Outlet />
        </>
    );
};
