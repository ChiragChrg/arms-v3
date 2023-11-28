interface DeferredPrompt {
    prompt: () => void;
    userChoice: Promise<{ outcome: string }>;
}

let deferredPrompt: DeferredPrompt | null = null;

// Show PWA install alert triggered by user button click
export const HandlePWAInstall = async () => {
    console.log("deferredPWAPrompt", deferredPrompt);

    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(outcome);
        deferredPrompt = null;
    } else {
        alert("Prompt Failed");
    }
};

const PWA = () => {
    console.log("PWA Triggered")
    window.addEventListener("beforeinstallprompt", (e) => {
        console.log("PWA Event", e)
        e.preventDefault();
        deferredPrompt = e as unknown as DeferredPrompt;
    });

    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        console.log("PWA was installed");
    });
};

export default PWA;
