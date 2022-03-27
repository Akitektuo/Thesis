// Source: https://gist.github.com/gordonbrander/2230317?permalink_comment_id=3404537#gistcomment-3404537
export const generateUid = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    + Math.random().toString(16).slice(2)
    + Date.now().toString(16).slice(4);