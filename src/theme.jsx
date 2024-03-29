import { createTheme, alpha } from '@mui/material/styles';
import { esES } from '@mui/x-date-pickers';

const palette = {
    primary: {
        main: '#A167C9',
        contrastText: '#fff'
    },
    secondary: {
        main: '#fff',
        contrastText: 'rgba(31, 44, 56, 1)'
    },
    error: {
        main: '#F24747',
        contrastText: '#fff'
    },
    info: {
        main: '#3B82F6',
        contrastText: '#fff'
    },
    warning: {
        main: '#F59E0B',
        contrastText: '#fff'
    },
    success: {
        main: '#10B981',
        contrastText: '#fff'
    },
    text: {
        primary: 'rgba(31, 44, 56, 1)',
        secondary: '#4B4B4B',
        tertiary: '#858585'
    },
    divider: '#ccc',
    background: {
        default: '#E5E5E5'
    }
}

const theme = createTheme({
    typography: {
        fontFamily: 'Ubuntu, sans-serif',
        color: 'rgba(31, 44, 56, 1)'
    },
    palette: palette,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '8px 24px',
                    textTransform: 'unset',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    borderRadius: '100px',
                    gap: '8px',
                    boxShadown: '0px 2px 12px rgba(161, 103, 201, 0.36);'
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backdropFilter: "blur(4px)"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: '1px solid #ccc',
                    borderRadius: '100px !important',
                    padding: '10px 12px',
                    transition: theme.transitions.create([
                        'border-color',
                        'background-color',
                        'box-shadow',
                    ]),
                    '&.Mui-focused': {
                        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                        borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-error': {
                        border: `2px solid ${theme.palette.error.main}`
                    },
                })
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    lineHeight: '22px',
                    fontWeight: 500,
                    fontSize: '20px',
                    marginLeft: '-1rem',
                    color: '#858585'
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '100%'
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    fontWeight: 500,
                    // color: '#F24747'
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '& .MuiDialogContent-root': {
                        padding: theme.spacing(2),
                    },
                    '& .MuiDialog-paper': {
                        borderRadius: '16px',
                        maxWidth: 'fit-content'
                    },
                    '& .MuiDialogActions-root': {
                        padding: theme.spacing(1),
                    },
                })
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '& .MuiDivider-wrapper': {
                        color: theme.palette.divider
                    }
                })
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontWeight: 500
                }
            }
        },
        MuiPickersCalendarHeader: {
            label: {
                textTransform: 'uppercase'
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip:({ theme }) => ({
                    backgroundColor: '#fff',
                    color: theme.palette.text.tertiary,
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: 400,
                    padding: '12px',
                    lineHeight: '16px',
                    maxWidth: '160px'
                })
            }
        }
    }
}, esES);

export default theme;
