export const PHONE = {
    rules: {
        required: true,
        pattern: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
        notfound: true,
        unique: true
    },
    messages: {
        required: "Ingrese su teléfono",
        pattern: 'Introduzca un número de teléfono válido',
        notfound: 'El usuario no ha sido encontrado.',
        unique: 'El teléfono ha sido registrado.'
    }
}

export const BUSINESS_NAME = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingrese el nombre de su negocio."
    }
}

export const NAME = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingresar nombre."
    }
}

export const DESCRIPTION = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingresar descripción."
    }
}

export const LAST_NAME = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingrese su apellido."
    }
}

export const BUSINESS_ADDRESS = {
    rules: {
        required: true
    },
    messages: {
        required: "Ingrese la dirección su negocio."
    }
}

export const CONFIRM_PASSWORD = {
    rules: {
        required: true,
        minLength: 6
    },
    messages: {
        required: "Repita la contraseña",
        minLength: "Mínimo 6 caracteres",
        validate: "Las contraseñas no coinciden."
    }
}

export const EMAIL = {
    rules: {
        required: true,
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        unique: true,
        notfound: true,
        deleted: true,
        byrrss: true
    },
    messages: {
        byrrss: 'Debe iniciar sesión por una red social.',
        deleted: 'La cuenta asociada ha sido eliminada por el usuario.',
        unique: 'El correo ha sido registrado.',
        required: "Ingrese su correo",
        pattern: "Email inválido",
        notfound: 'El usuario no ha sido encontrado.'
    }
}

export const FEATURES = {
    rules: {
        required: true,
        minLength: 1
    },
    messages: {
        required: "Seleccione al menos una característica.",
        minLength: "Seleccione al menos una característica."
    }
}

export const ADD_PHOTOS = {
    rules: {
        required: true,
        minLength: 1
    },
    messages: {
        required: "Ingrese al menos una foto.",
        minLength: "Ingrese al menos una foto."
    }
}

export const PASSWORD = {
    rules: {
        required: true,
        minLength: 6,
        invalid: true
    },
    messages: {
        required: "Ingrese una contraseña.",
        minLength: "Mínimo 6 caracteres.",
        invalid: 'Credenciales inválidas.'
    }
}

export const DOG_TYPE = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione un tipo de raza.",
    }
}

export const DOG_GENDER = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione el género de su perro.",
    }
}

export const CITY = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione una ciudad.",
    }
}

export const PROVINCE = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione una provincia.",
    }
}

export const PHOTO = {
    rules: {
        required: true,
    },
    messages: {
        required: 'Seleccione una imagen.'
    }
}

export const DATE_BIRTH = {
    rules: {
        required: true,
    },
    messages: {
        required: "Ingrese su fecha de nacimiento."
    }
}

export const BREED = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione la raza de su perro.",
    }
}

export const DOG_AGE = {
    rules: {
        required: true,
    },
    messages: {
        required: "Seleccione el año de nacimiento.",
    }
}
