import toast from "react-hot-toast";

interface DeferredPrompt {
    prompt: () => void;
    userChoice: Promise<{ outcome: string }>;
}

export let deferredPrompt: DeferredPrompt | null = null;

// Show PWA install alert triggered by user button click
export const HandlePWAInstall = async () => {
    if (deferredPrompt) {
        console.log(deferredPrompt)
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("PWA Install prompt choice:", outcome)
        deferredPrompt = null;
    } else {
        toast.error("PWA not installed")
    }
};

const PWA = () => {
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e as unknown as DeferredPrompt;
    });

    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        toast.success("PWA App installed 👍🏻", {
            id: 'pwaToast',
        })
        console.log("PWA was installed");
    });
};

export default PWA;
