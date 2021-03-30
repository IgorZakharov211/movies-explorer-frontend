export const validators = {
  name: {
    required: (value) => { return value === ''; },
    minLength: (value) => { return value.length < 2; },
    maxLength: (value) => { return value.length > 30; },
    containValidValue: (value) => { return !/^[a-zA-Z][a-zA-Z- ]{2,30}$/i.test(value); }
  },
  email:{
    required: (value) => { return value === ''; },
    isEmail: (value) => { return !/.+@.+\..+/i.test(value); }
  }, 
  password:{
    required: (value) => { return value === ''; }
  },
  movie:{
    required: (value) => { return value === ''; }
  }
}

