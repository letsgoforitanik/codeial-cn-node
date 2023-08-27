"use strict";
const imgUserAvatar = document.querySelector('#img-user-avatar');
const fileUserAvatar = document.querySelector('#file-user-avatar');
// event handlers
$(imgUserAvatar).on('click', handleImgClick);
$(fileUserAvatar).on('change', handleFileChange);
function handleImgClick() {
    $(fileUserAvatar).trigger('click');
}
function handleFileChange() {
    const file = this.files[0];
    const imageUrl = URL.createObjectURL(file);
    $(imgUserAvatar).prop('src', imageUrl);
}
