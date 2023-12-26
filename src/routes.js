import Admin from './Page/Admin';
import Auth from './Page/Auth';
import CreateEvent from './Page/CreateEvent';
import EventPage from './Page/EventPage';
import ListEvents from './Page/ListEvents';
import UserProfile from './Page/UserProfile'
import { ADMIN_ROUTE, CREATEEVENT_ROUTE, EVENT_ROUTE, LISTEVENT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USERPROFILE_ROUTE } from './Utils/consts';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: USERPROFILE_ROUTE,
        Component: UserProfile
    },
    {
        path: CREATEEVENT_ROUTE,
        Component: CreateEvent 
    }
]

export const publicRoutes = [
    {
        path: LISTEVENT_ROUTE,
        Component: ListEvents
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: EVENT_ROUTE + '/:id',
        Component: EventPage
    },
]
