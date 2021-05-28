export function checkCookiePolicy() {
    const accepted = localStorage.getItem('tvsmashup_cookie_accept');
    if(accepted) {
        return true;
    } else {
        return false;
    }
}

export function setCookiePolicy() {
    localStorage.setItem('tvsmashup_cookie_accept', true);
}




