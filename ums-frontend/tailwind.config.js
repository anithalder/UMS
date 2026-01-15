import daisyui from "daisyui";

export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: { royalblue: '#0B3D91' },
        },
    },
    daisyui: {
        themes: [
            {
                ucalcutta: {
                    primary: '#0B3D91',
                    secondary: '#E5E7EB',
                    accent: '#2563EB',
                    neutral: '#1E3A8A',
                    'base-100': '#FFFFFF',
                    info: '#60A5FA',
                    success: '#10B981',
                    warning: '#FBBF24',
                    error: '#EF4444',
                },
            },
        ],
    },
    // eslint-disable-next-line no-undef
    plugins: [daisyui()],
};
