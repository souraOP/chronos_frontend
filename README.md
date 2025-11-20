
<div align="center">

# • Chronos Frontend •
**Employee Leave and Attendance Management System**

A modern, enterprise-grade Angular application for managing employee attendance and leave requests.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Angular](https://img.shields.io/badge/Angular-19.2.0-red.svg)](https://angular.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.12-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-lightgrey.svg)]()

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Chronos** is a comprehensive employee management solution designed to streamline leave requests, attendance tracking, and workforce management. Built with the latest Angular 19 framework and styled with Tailwind CSS, Chronos provides a responsive, intuitive interface for both employees and administrators.

This repository contains the frontend application that interfaces with the Chronos backend services to deliver a seamless user experience for managing employee time-off, attendance records, and related HR processes.

---

## ✨ Features

- **🔐 User Authentication & Authorization** - Secure login system with role-based access control
- **📅 Leave Management** - Submit, track, and approve leave requests with calendar integration
- **⏰ Attendance Tracking** - Real-time attendance monitoring and reporting
- **📊 Dashboard Analytics** - Comprehensive analytics and insights for HR teams
- **👥 Employee Directory** - Centralized employee information management
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **⚡ Fast Performance** - Optimized Angular 19 with lazy loading and AOT compilation

---

## 🛠 Tech Stack

### Core Framework
- **Angular 19.2.0** - Progressive web application framework
- **TypeScript 5.7.2** - Type-safe JavaScript development
- **RxJS 7.8.0** - Reactive programming with observables

### Styling & UI
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS transformation and optimization

### Development Tools
- **Angular CLI 19.2.15** - Command-line interface for Angular
- **Karma & Jasmine** - Unit testing framework
- **Faker.js 10.0.0** - Mock data generation for testing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher) or **yarn**
- **Angular CLI** (v19.x)

```bash
# Install Angular CLI globally
npm install -g @angular/cli
```

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/souraOP/chronos_frontend.git
   cd chronos_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Update the environment configuration files in `src/environment/` with your API endpoints and configuration settings.

---

## 💻 Development

### Start Development Server

Run the development server with hot-reload:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you make changes to the source files.

### Development Commands

```bash
# Start dev server
npm start

# Start dev server with specific port
ng serve --port 4300

# Start dev server with production configuration
ng serve --configuration production

# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new module
ng generate module module-name
```

---

## 🏗 Building

### Development Build

```bash
npm run build
```

### Production Build

```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory. The production build optimizes the application for best performance with:
- Ahead-of-Time (AOT) compilation
- Tree shaking
- Minification
- Dead code elimination

### Watch Mode

For continuous building during development:

```bash
npm run watch
```

---

## 🧪 Testing

### Unit Tests

Run unit tests using Karma test runner:

```bash
npm test
# or
ng test
```

The tests will execute in Chrome and watch for file changes.

### Code Coverage

Generate code coverage reports:

```bash
ng test --code-coverage
```

Coverage reports will be generated in the `coverage/` directory.

---

## 📁 Project Structure

```
chronos_frontend/
├── src/
│   ├── app/                    # Application components and modules
│   │   └── ...
│   ├── environment/            # Environment configuration files
│   │   └── ...
│   ├── index.html             # Main HTML file
│   ├── main.ts                # Application entry point
│   └── styles.css             # Global styles
├── public/                     # Static assets
├── .vscode/                    # VS Code configuration
├── angular.json               # Angular workspace configuration
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration (if applicable)
└── README.md                  # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow Angular style guide
- Write meaningful commit messages
- Add unit tests for new features
- Ensure all tests pass before submitting PR
- Update documentation as needed

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 👨‍💻 Author

**souraOP**
- GitHub: [@souraOP](https://github.com/souraOP)

---

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and maintainers

---

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

<div align="center">

**Made with ❤️ using Angular 19 and Tailwind CSS**

</div>