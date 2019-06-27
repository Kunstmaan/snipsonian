interface IOnToggleConfig {
    onToggle: () => void;
}

export default function listenForTranslationKeyToggles(config: IOnToggleConfig) {
    document.addEventListener('keydown', (e) => {
        // Toggle translation keys (instead of translated messages) when "Alt + Shift + L" is pressed
        if (e.altKey && e.shiftKey && (e.key === 'l' || e.code === 'KeyL' || e.keyCode === 76)) {
            config.onToggle();
        }
    });
}
