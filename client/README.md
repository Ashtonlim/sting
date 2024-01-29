# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Notes:

Ref: https://youtu.be/16yMmAJSGek?si=7mb1gv-PcoJbl8zX (has solution)

useContext() has a performance issue. It rerenders other components that call useContext even when it does not use the state that was changed.
