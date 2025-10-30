let dialogResolve = null;

function showCustomDialog(message, placeholder) {
    return new Promise((resolve) => {
        dialogResolve = resolve;
        document.getElementById('dialog-message').textContent = message;
        document.getElementById('dialog-input').placeholder = placeholder;
        document.getElementById('dialog-input').value = '';
        document.getElementById('dialog-overlay').classList.add('active');
        document.getElementById('dialog-input').focus();
    });
}

function closeDialog(value) {
    document.getElementById('dialog-overlay').classList.remove('active');
    if (dialogResolve) {
        dialogResolve(value);
        dialogResolve = null;
    }
}

document.getElementById('dialog-ok').addEventListener('click', () => {
    const value = document.getElementById('dialog-input').value;
    closeDialog(value);
});

document.getElementById('dialog-cancel').addEventListener('click', () => {
    closeDialog(null);
});

document.getElementById('dialog-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const value = document.getElementById('dialog-input').value;
        closeDialog(value);
    }
});

const text = document.getElementById('text1');
const title = document.querySelector('h1');
const basketStat = document.getElementById('basketstat');
const basket = document.getElementById('basket');
let flowerCount = 0;
let committedTextColor = "#000000";

text.style.color = committedTextColor;
title.style.color = committedTextColor;

const colorDialogOverlay = document.getElementById('color-dialog-overlay');
const changeTextColorBtn = document.getElementById('changeTextColorBtn');
const popupColorPicker = document.getElementById('popupColorPicker');
const colorDialogOk = document.getElementById('color-dialog-ok');
const colorDialogCancel = document.getElementById('color-dialog-cancel');

changeTextColorBtn.addEventListener('click', () => {
    popupColorPicker.value = committedTextColor;
    colorDialogOverlay.classList.add('active');
});

popupColorPicker.addEventListener('input', () => {
    text.style.color = popupColorPicker.value;
    title.style.color = popupColorPicker.value;
});

colorDialogOk.addEventListener('click', () => {
    committedTextColor = popupColorPicker.value;
    text.style.color = committedTextColor;
    title.style.color = committedTextColor;
    colorDialogOverlay.classList.remove('active');
});

colorDialogCancel.addEventListener('click', () => {
    text.style.color = committedTextColor;
    title.style.color = committedTextColor;
    colorDialogOverlay.classList.remove('active');
});

document.getElementById('bccol').addEventListener('click', async () => {
    const bgColor = await showCustomDialog('input your color', 'yellow');
    if (bgColor) {
        document.body.style.backgroundColor = bgColor;
    }
});

const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('click', () => {
        flowerCount++;
        basketStat.textContent = `The flower basket currently contains ${flowerCount} flower${flowerCount > 1 ? 's' : ''}.`;
        const clonedImage = img.cloneNode(true);
        basket.appendChild(clonedImage);
    });
});