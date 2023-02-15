import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';
// All routes
import AppRoutes from './AppRoutes'
// Contexts
import { BusinessProvider } from './context/BusinessContext'
import { AuthProvider } from './context/AuthContext'
import { FavouriteProvider } from './context/FavouriteContext'
import { GuestProvider } from './context/GuestContext'
import { PublicationProvider } from './context/PublicationContext';
import { MultiStepProvider } from './context/MultiStepContext';
import { BlogProvider } from './context/BlogContext';
import { ChatProvider } from './context/ChatContext';

const App = () => (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <FavouriteProvider>
                    <GuestProvider>
                        <PublicationProvider>
                            <MultiStepProvider>
                                <BlogProvider>
                                    <ChatProvider>
                                        <BusinessProvider>
                                            <AppRoutes />
                                        </BusinessProvider>
                                    </ChatProvider>
                                </BlogProvider>
                            </MultiStepProvider>
                        </PublicationProvider>
                    </GuestProvider>
                </FavouriteProvider>
            </AuthProvider>
        </ThemeProvider>
    </LocalizationProvider>
);

export default App;
