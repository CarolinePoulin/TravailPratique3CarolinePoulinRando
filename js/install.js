let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

function installPWA(evt) {
    deferredInstallPrompt.prompt();
    evt.srcElement.setAttribut('hidden', true);

    deferredInstallPrompt.userChoice
    .then((choice) => {
        if (choice,outcome === 'accepted') {
            console.log("L'usager a installé la PWA via mon boutton.", choice);
        } else {
            console.log("L'usager a refusé d'installer la PWA.", choice);
        }
        deferredInstallPrompt = null;
    });
}

window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(evt) {
    console.log("L'usager a installé la PWA via les ... de Chrome.", evt);
}