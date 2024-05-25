export const testEmail = (email)=>{
    const emailRegex = /^(?=.{5,})[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const testPassword = (password)=>{
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-])[A-Za-z\d!@#$%^&*\-]{9,}$/;
    return passwordRegex.test(password);
}