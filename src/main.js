import { mount } from 'svelte';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import './style.css';
import App from './App.svelte';
mount(App, { target: document.getElementById('app') });
