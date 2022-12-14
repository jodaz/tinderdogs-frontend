import {
    Route,
    Routes,
    useLocation
} from 'react-router-dom'
// Layouts
import AppLayout from './layouts/App';
import LandingLayout from './layouts/LandingLayout';
// Pages
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecoverPassword from './components/RecoverPassword';
import Intro from './pages/Intro';
import DetectLocation from './components/Modals/DetectLocation';
import Market from './pages/Market';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import NewPassword from './components/Modals/NewPassword';
import AskCode from './components/Modals/AskCode';
import Notifications from './pages/Notifications'
import CreateProfileWelcome from './components/CreateProfileWelcome';
import Business from './pages/Business';
import RegisterBusiness from './components/Modals/RegisterBusiness';
import Terms from './pages/Terms';
import PetProfile from './pages/Profile/PetProfile';
import PetOwner from './pages/Profile/PetOwner';
import Settings from './pages/Settings';
import Favourites from './pages/Favourites';
import Account from './pages/account';
import CreateAd from './pages/Ad/CreateAd';
import PersonalInformation from './pages/PersonalInformation';
import EditNames from './pages/PersonalInformation/EditNames';
import EditLocation from './pages/PersonalInformation/EditLocation';
import PetInformation from './pages/PetInformation';
import EditPetName from './pages/PetInformation/EditPetName';
import EditBreed from './pages/PetInformation/EditBreed';
import EditGender from './pages/PetInformation/EditGender';
import EditYearDate from './pages/PetInformation/EditYearDate';
import EditCharacteristics from './pages/PetInformation/EditCharacteristics';
import EditVaccines from './pages/PetInformation/EditVaccines';
import EditCertificates from './pages/PetInformation/EditCertificates';
import EditAd from './pages/Ad/EditAd';
import EditOwnerAge from './pages/PersonalInformation/EditOwnerAge';
import EditOwnerProfilePictures from './pages/Profile/EditOwnerProfilePictures';

function AppRoutes() {
    let location = useLocation();

    return (
        <Routes>
            <Route
                path='*'
                element=<NotFound />
            />
            <Route
                path='/home'
                element={
                    <AppLayout>
                        <Home />
                    </AppLayout>
                }
            />
            <Route
                path='/market'
                element={
                    <AppLayout>
                        <Market />
                    </AppLayout>
                }
            />
            <Route
                path='/chat'
                element={
                    <AppLayout>
                        <Chat />
                    </AppLayout>
                }
            />
            <Route
                path='/blog'
                element={
                    <AppLayout>
                        <Blog />
                    </AppLayout>
                }
            />
            {/**
             * Publication routes
             */}
            <Route
                path='/profile/ads/create'
                element={
                    <AppLayout>
                        <CreateAd location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/ads/:id/edit'
                element={
                    <AppLayout>
                        <EditAd location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/ads/show'
                element={
                    <AppLayout>
                        <CreateAd location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/owner'
                element={
                    <AppLayout>
                        <PersonalInformation location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/owner/names'
                element={
                    <AppLayout>
                        <EditNames location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/owner/age'
                element={
                    <AppLayout>
                        <EditOwnerAge location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/owner/location'
                element={
                    <AppLayout>
                        <EditLocation />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet'
                element={
                    <AppLayout>
                        <PetInformation location={location} />
                    </AppLayout>
                }
            />

            <Route
                path='/profile/settings/pet/name'
                element={
                    <AppLayout>
                        <EditPetName location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/breed'
                element={
                    <AppLayout>
                        <EditBreed />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/gender'
                element={
                    <AppLayout>
                        <EditGender />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/age'
                element={
                    <AppLayout>
                        <EditYearDate />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/characteristics'
                element={
                    <AppLayout>
                        <EditCharacteristics />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/vaccines'
                element={
                    <AppLayout>
                        <EditVaccines />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/pet/certificates'
                element={
                    <AppLayout>
                        <EditCertificates />
                    </AppLayout>
                }
            />

            {/**
             * Profile routes
             */}
            <Route
                path='/profile'
                element={
                    <AppLayout>
                        <Profile location={location}>
                            <PetProfile />
                        </Profile>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/owner'
                element={
                    <AppLayout>
                        <Profile location={location}>
                            <PetOwner />
                        </Profile>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/owner/pictures'
                element={
                    <AppLayout>
                        <Profile location={location}>
                            <EditOwnerProfilePictures />
                        </Profile>
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings'
                element={
                    <AppLayout>
                        <Settings />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/settings/account'
                element={
                    <AppLayout>
                        <Account location={location} />
                    </AppLayout>
                }
            />
            <Route
                path='/profile/favourites'
                element={
                    <AppLayout>
                        <Profile location={location}>
                            <Favourites title="Favoritos" />
                        </Profile>
                    </AppLayout>
                }
            />

            <Route
                path='/notifications'
                element={
                    <AppLayout>
                        <Notifications />
                    </AppLayout>
                }
            />

            <Route path="/" element={
                <LandingLayout>
                    <Landing location={location} />
                </LandingLayout>
            }>
                <Route path="/login" element={<Login location={location} />} />
                <Route path="/detect-location" element={<DetectLocation location={location} />} />
                <Route path="/register" element={<SignUp location={location} />} />
                <Route path="/recover-password" element={<RecoverPassword location={location} />} />
                <Route path="/recover-password/new" element={<NewPassword location={location} />} />
                <Route path="/recover-password/code" element={<AskCode location={location} />} />
            </Route>
            <Route path="/register/welcome" element={<CreateProfileWelcome location={location} />} />

            {/** Bussiness routes */}
            <Route path="/business" element={
                <LandingLayout dark>
                    <Business />
                </LandingLayout>
            }>
                <Route path="/business/register" element={<RegisterBusiness location={location} />} />
            </Route>

            <Route path="/introduction" element={<Intro />} />

            <Route path="/terms-conditions" element={<Terms />} />

            <Route path="/privacy" element={<Terms />} />
        </Routes>
    );
}

export default AppRoutes;
