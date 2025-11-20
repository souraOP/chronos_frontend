# Chronos - Employee Leave and Attendance Management System

## Comprehensive Code Documentation

### 📋 Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Architecture Overview](#2-architecture-overview)
- [3. Core Modules](#3-core-modules)
- [4. Components Documentation](#4-components-documentation)
- [5. Services Documentation](#5-services-documentation)
- [6. Models and Interfaces](#6-models-and-interfaces)
- [7. Constants and Enums](#7-constants-and-enums)
- [8. Guards and Interceptors](#8-guards-and-interceptors)
- [9. Validators and Pipes](#9-validators-and-pipes)
- [10. Routing Structure](#10-routing-structure)

---

## 1. Project Overview

**Chronos** is an enterprise-grade Angular application built with Angular 19 and TypeScript, designed to manage employee attendance, leave requests, and workforce management. The system supports role-based access control with separate interfaces for employees and managers.

### Technology Stack

- **Frontend**: Angular 19.2.0, TypeScript 5.7.2
- **Styling**: Tailwind CSS 4.1.12
- **State Management**: RxJS 7.8.0
- **Testing**: Karma, Jasmine, Faker.js

### Key Features

- Role-based authentication (Employee/Manager)
- Leave request management
- Attendance tracking with clock-in/out
- Dashboard analytics
- Shift management and swap requests
- Report generation
- Real-time notifications

---

## 2. Architecture Overview

### Application Structure

```
src/app/
├── constants/          # Enums and constant definitions
├── guards/            # Route guards for authentication
├── interceptors/      # HTTP interceptors
├── landing-page/      # Main application components
│   ├── employee-section/    # Employee-specific features
│   ├── manager-section/     # Manager-specific features
│   ├── employee-login-page/ # Authentication components
│   └── models/             # Data models and interfaces
├── pipe/              # Custom pipes
├── routes/            # Route configurations
├── shared/            # Shared services and utilities
├── validators/        # Form validators
└── environment/       # Environment configurations
```

### Design Patterns Used

- **Component-Service Architecture**: Separation of concerns with components handling UI and services managing data
- **Lazy Loading**: Route-level code splitting for performance optimization
- **Observable Pattern**: RxJS for reactive programming and state management
- **Dependency Injection**: Angular's built-in DI for service management
- **Guard Pattern**: Route protection and authentication
- **Interceptor Pattern**: HTTP request/response processing

---

## 3. Core Modules

### 3.1 App Module

**File**: `app.component.ts`, `app.config.ts`, `main.ts`

The root application module that bootstraps the entire application with standalone components architecture.

```typescript
// Main application configuration
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideHttpClient(withInterceptors([authInterceptor]))],
};
```

### 3.2 Landing Page Module

**File**: `landing-page/landing-page.component.ts`

Entry point component that handles initial navigation and routing to authentication.

**Key Responsibilities:**

- Initial application entry point
- Navigation to login page
- Route redirection based on authentication state

---

## 4. Components Documentation

### 4.1 Authentication Components

#### 4.1.1 Employee Login Component

**Path**: `landing-page/employee-login-page/employee-login-page.component.ts`

Handles employee authentication with form validation and role-based redirection.

**Features:**

- Reactive form validation
- Authentication service integration
- Role-based navigation
- Error handling and user feedback

#### 4.1.2 Manager Login Component

**Path**: `landing-page/employee-login-page/manager-login-page/manager-login-page.component.ts`

Dedicated manager authentication interface with enhanced security features.

#### 4.1.3 Forgot Password Component

**Path**: `landing-page/employee-login-page/forgot-password-page/forgot-password-page.component.ts`

Password recovery system with email verification and secure password reset flow.

**Key Features:**

- Email validation
- Secure password reset flow
- User feedback and error handling
- Navigation to change password form

### 4.2 Employee Section Components

#### 4.2.1 Employee Dashboard

**Path**: `landing-page/employee-section/dashboard/dashboard.component.ts`

Central hub for employee activities displaying personalized information and quick actions.

**Features:**

- Personal information display
- Leave balance overview
- Recent leave requests
- Upcoming shifts preview
- Quick action buttons

**Sub-components:**

- `recent-leave-requests-section/`: Displays recent leave request status
- `upcoming-shifts-section/`: Shows upcoming shift information

#### 4.2.2 Employee Attendance

**Path**: `landing-page/employee-section/employee-attendance/employee-attendance.component.ts`

Real-time attendance tracking with clock-in/out functionality.

**Features:**

- Clock-in/Clock-out functionality
- Real-time time tracking
- Attendance history display
- Daily hours calculation
- Status indicators (Active/Complete)

**Key Methods:**

- `handleClockAction()`: Manages clock-in/out operations
- `refreshHistory()`: Updates attendance records
- Time calculation and status management

#### 4.2.3 Employee Leave Requests

**Path**: `landing-page/employee-section/employee-leave-requests/employee-leave-requests.component.ts`

Comprehensive leave request management interface for employees.

**Features:**

- Create new leave requests
- View request history
- Edit pending requests
- Cancel submitted requests
- Leave balance tracking

#### 4.2.4 Employee Shift Management

**Path**: `landing-page/employee-section/employee-shift-management/employee-shift-management.component.ts`

Shift scheduling and swap request management system.

**Features:**

- View upcoming shifts
- Request shift swaps
- Manage swap requests
- Team member shift visibility
- Modal-based swap request forms

**Sub-components:**

- `all-upcoming-shifts/`: Displays all scheduled shifts
- Shift swap request management

#### 4.2.5 Employee User Profile

**Path**: `landing-page/employee-section/employee-user-profile/employee-user-profile.component.ts`

Personal profile management and account settings.

**Features:**

- View personal information
- Leave balance display
- Password change functionality
- Profile update capabilities

**Sub-components:**

- `change-password/`: Secure password modification

#### 4.2.6 Sidebar Component

**Path**: `landing-page/employee-section/sidebar/sidebar.component.ts`

Navigation sidebar for employee section with role-based menu items.

**Features:**

- Navigation menu
- User information display
- Logout functionality
- Active route highlighting

### 4.3 Manager Section Components

#### 4.3.1 Manager Dashboard

**Path**: `landing-page/manager-section/manager-dashboard/manager-dashboard.component.ts`

Executive dashboard providing comprehensive team oversight and analytics.

**Features:**

- Team attendance overview
- Recent team activities
- Leave request summaries
- Key performance indicators
- Quick action buttons

**Sub-components:**

- `teams-attendance/`: Team attendance tracking
- `recent-activity/`: Recent team activities

#### 4.3.2 Manager Attendance

**Path**: `landing-page/manager-section/manager-attendance/manager-attendance.component.ts`

Team attendance monitoring and management interface.

**Features:**

- View all team member attendance
- Filter by date ranges
- Export attendance reports
- Attendance pattern analysis
- Real-time status updates

#### 4.3.3 Manager Leave Requests

**Path**: `landing-page/manager-section/manager-leave-requests/manager-leave-requests.component.ts`

Leave request approval and management system for managers.

**Features:**

- View pending leave requests
- Approve/reject requests
- View leave history
- Leave pattern analysis
- Bulk operations support

#### 4.3.4 Manager Shift Management

**Path**: `landing-page/manager-section/manager-shift-management/manager-shift-management.component.ts`

Comprehensive shift scheduling and team management interface.

**Features:**

- Create team shifts
- Manage shift assignments
- Handle shift swap requests
- Team availability overview
- Shift pattern optimization

**Sub-components:**

- `teams-shift-overview/`: Team shift visualization
- `teams-shift-swap-requests/`: Swap request management

#### 4.3.5 Manager Report Analytics

**Path**: `landing-page/manager-section/manager-report-analytics/manager-report-analytics.component.ts`

Advanced reporting and analytics dashboard for data-driven decisions.

**Features:**

- Generate custom reports
- Data visualization
- Export capabilities
- Historical data analysis
- Performance metrics

#### 4.3.6 Manager User Profile

**Path**: `landing-page/manager-section/manager-user-profile/manager-user-profile.component.ts`

Manager profile management with administrative capabilities.

**Features:**

- Personal information management
- Administrative settings
- Password management
- Team access controls

#### 4.3.7 Manager Sidebar

**Path**: `landing-page/manager-section/manager-sidebar/manager-sidebar.component.ts`

Navigation sidebar for manager section with administrative menu items.

**Features:**

- Administrative navigation
- Manager information display
- Quick access to key functions
- Role-based menu visibility

---

## 5. Services Documentation

### 5.1 Authentication Services

#### 5.1.1 Auth Service

**Path**: `shared/services/auth.service.ts`

Central authentication service managing user sessions and authorization.

**Key Methods:**

- `login()`: User authentication
- `logout()`: Session termination
- `getUser()`: Current user information
- `isAuthenticated()`: Authentication status check
- Token management and validation

#### 5.1.2 Forgot Password Service

**Path**: `shared/services/forgot-password.service.ts`

Password recovery and reset functionality.

**Features:**

- Email validation
- Password reset requests
- Secure token handling
- Email notification integration

#### 5.1.3 Change Password Service

**Path**: `shared/services/change-password.service.ts`

Secure password modification service.

**Features:**

- Current password validation
- New password requirements check
- Secure password updates
- Session management after password change

### 5.2 Employee Services

#### 5.2.1 Employee Dashboard Service

**Path**: `shared/services/employee-services/employee-dashboard.service.ts`

Data provider for employee dashboard components.

**Key Methods:**

- `getEmployeeName()`: Fetch employee information
- `getLeaveRequests()`: Recent leave requests
- Dashboard metrics and statistics

#### 5.2.2 Employee Attendance Service

**Path**: `shared/services/employee-services/employee-attendance.service.ts`

Attendance tracking and management service.

**Key Methods:**

- `clockIn()`: Clock-in functionality
- `clockOut()`: Clock-out functionality
- `getAttendanceHistory()`: Historical attendance data
- Time calculations and status management

#### 5.2.3 Employee Leave Request Service

**Path**: `shared/services/employee-services/employee-leave-request.service.ts`

Leave request management for employees.

**Key Methods:**

- `getLeaveRequests()`: Fetch employee leave requests
- `createNewLeaveRequest()`: Submit new leave requests
- `getUuid()`: Employee identification
- Leave balance calculations

#### 5.2.4 Employee Shift Service

**Path**: `shared/services/employee-services/employee-shift.service.ts`

Shift scheduling and management service.

**Key Methods:**

- `getEmployeeUpcomingShiftsDashboard()`: Dashboard shift data
- `getEmployeeUpcomingShiftsTable()`: Detailed shift information
- Team member data management
- Shift availability tracking

#### 5.2.5 Shift Swap Employee Service

**Path**: `shared/services/employee-services/shift-swap-employee.service.ts`

Shift swap request management for employees.

**Features:**

- Swap request creation
- Swap request tracking
- Team member shift visibility
- Approval workflow management

#### 5.2.6 Employee User Profile Service

**Path**: `shared/services/employee-services/employee-user-profile.service.ts`

Employee profile management service.

**Features:**

- Profile information retrieval
- Profile updates
- Password change navigation
- Personal data management

### 5.3 Manager Services

#### 5.3.1 Manager Dashboard Service

**Path**: `shared/services/manager-services/manager-dashboard.service.ts`

Comprehensive dashboard data provider for managers.

**Key Methods:**

- Team performance metrics
- Leave request summaries
- Attendance statistics
- Team member information

#### 5.3.2 Manager Attendance Service

**Path**: `shared/services/manager-services/manager-attendance.service.ts`

Team attendance monitoring and management.

**Features:**

- Team attendance overview
- Individual attendance tracking
- Attendance pattern analysis
- Report generation capabilities

#### 5.3.3 Manager Leave Request Service

**Path**: `shared/services/manager-services/manager-leave-request.service.ts`

Leave request approval and management system.

**Features:**

- Pending request management
- Approval/rejection workflow
- Leave history tracking
- Team leave pattern analysis

#### 5.3.4 Manager Shift Service

**Path**: `shared/services/manager-services/manager-shift.service.ts`

Comprehensive shift management for teams.

**Features:**

- Shift creation and assignment
- Team availability management
- Shift pattern optimization
- Resource allocation

#### 5.3.5 Manager Report Service

**Path**: `shared/services/manager-services/manager-report.service.ts`

Advanced reporting and analytics service.

**Key Methods:**

- `generateReport()`: Custom report generation
- Data export functionality
- Historical data analysis
- Performance metrics calculation

#### 5.3.6 Manager Shift Swap Service

**Path**: `shared/services/manager-services/manager-shift-swap.service.ts`

Shift swap approval and management for managers.

**Features:**

- Swap request review
- Approval workflow
- Team impact analysis
- Shift conflict resolution

#### 5.3.7 Manager User Profile Service

**Path**: `shared/services/manager-services/manager-user-profile.service.ts`

Manager profile and administrative settings.

**Features:**

- Manager profile management
- Administrative capabilities
- Team access controls
- System configuration

### 5.4 Shared Services

#### 5.4.1 Leave Balance Service

**Path**: `shared/services/leave-balance.service.ts`

Leave balance calculation and management service.

**Key Methods:**

- `getLeaveBalanceFromBackend()`: Fetch current balances
- `getNewSickLeaveBalance()`: Sick leave calculations
- `getNewVacationLeaveBalance()`: Vacation leave calculations
- `getNewPersonalLeaveBalance()`: Personal leave calculations
- Balance updates and tracking

---

## 6. Models and Interfaces

### 6.1 Authentication Models

#### Auth Model

**Path**: `landing-page/models/auth.model.ts`

Core authentication data structures.

```typescript
export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  uuid: string;
  email: string;
  role: Role;
  message: string;
  employeeId?: string;
  token: string;
}

export interface AuthUser {
  uuid: string;
  email: string;
  role: Role;
  employeeId?: string;
  token: string;
}

export interface ChangePasswordDTO {
  newPassword: string;
  confirmPassword: string;
}
```

### 6.2 Employee Models

#### Employee Model

**Path**: `landing-page/models/employee.model.ts`

Core employee data structure with comprehensive information.

```typescript
export class Employee {
  constructor(public uuid: string, public displayEmployeeId: string, public firstName: string, public lastName: string, public email: string, public gender: GENDER, public phoneNumber: string, public jobTitle: string, public isActive: boolean = true, public departmentName: string, public role: Role = Role.EMPLOYEE) {}
}
```

#### Employee Name Model

**Path**: `landing-page/models/employee-name.model.ts`

Simplified name structure for display purposes.

### 6.3 Leave Management Models

#### New Leave Balance Model

**Path**: `landing-page/models/new-leave-balance.model.ts`

Leave balance tracking structure.

```typescript
export class NewLeaveBalance {
  constructor(public balanceId: string, public leaveType: LeaveType, public leaveBalance: number) {}
}
```

#### Leave Request Response Models

**Path**: `landing-page/models/leave-request-response/`

- `manager-leave-request-dashboard.model.ts`: Manager dashboard leave data
- `employee-leave-request-dashboard-response.model.ts`: Employee leave overview
- `create-leave-balance-response.model.ts`: Leave balance creation response

### 6.4 Shift Management Models

#### Shift Model

**Path**: `landing-page/models/shift.model.ts`

Core shift data structure with scheduling information.

```typescript
export class Shift {
  constructor(public uuid: string, public employee_id: string, public shift_id: string, public shift_date: string, public shift_start_time: string, public shift_end_time: string, public shift_type: ShiftType, public shift_status: ShiftStatus, public shift_location?: string, public id?: string, public employee?: Employee) {}
}
```

#### Shift Response Models

**Path**: `landing-page/models/shifts-response/`

- `dashboard-shift-response.model.ts`: Dashboard shift data
- `employee-shift-response.model.ts`: Employee shift tables
- `manager-teams-shift-response.model.ts`: Manager team shift overview
- `shift-card.model.ts`: Shift card display data
- `team-members-with-shift.model.ts`: Team member shift associations

### 6.5 Attendance Models

#### Attendance Response Models

**Path**: `landing-page/models/attendance-response/`

- `attendance-history-response.model.ts`: Historical attendance data
- `manager-attendance-row.model.ts`: Manager attendance table data

### 6.6 Team Management Models

#### Team Models

**Path**: `landing-page/models/team.model.ts`, `team-members.model.ts`

Team structure and member information for organizational hierarchy.

```typescript
export class TeamMembers {
  constructor(public uuid: string, public employeeID: string, public firstName: string, public lastName: string, public email: string, public jobTitle: string, public id?: string) {}
}
```

---

## 7. Constants and Enums

### 7.1 Role Management

**Path**: `constants/role.ts`

User role definitions for access control.

```typescript
export enum Role {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
}
```

### 7.2 Leave Management Constants

**Path**: `constants/leave-type.ts`, `constants/leave-status.ts`

Leave categorization and status tracking.

```typescript
export enum LeaveType {
  SICK = "SICK",
  VACATION = "VACATION",
  PERSONAL = "PERSONAL",
}

export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
```

### 7.3 Attendance Constants

**Path**: `constants/attendance-status.ts`

Attendance state management.

```typescript
export enum AttendanceStatus {
  ACTIVE = "ACTIVE",
  COMPLETE = "COMPLETE",
}
```

### 7.4 Shift Management Constants

**Path**: `constants/shift-type.ts`, `constants/shift-status.ts`, `constants/shift-swap-status.ts`

Shift scheduling and swap management constants.

```typescript
export enum ShiftType {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT",
}

export enum ShiftStatus {
  SCHEDULED = "SCHEDULED",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
```

### 7.5 Employee Constants

**Path**: `constants/gender.ts`

Employee demographic information.

```typescript
export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
```

---

## 8. Guards and Interceptors

### 8.1 Authentication Guard

**Path**: `guards/auth.guard.ts`

Route protection service ensuring authenticated access to protected routes.

**Features:**

- Route access validation
- Authentication state checking
- Automatic redirection to login
- Role-based route protection

**Key Methods:**

- `canActivate()`: Route access validation
- Authentication state management
- Redirection logic for unauthorized access

### 8.2 Auth Interceptor

**Path**: `interceptors/auth.interceptor.ts`

HTTP request interceptor for authentication token management.

**Features:**

- Automatic token attachment
- Request/response interception
- Token refresh handling
- Error response management
- Unauthorized access handling

**Key Functionality:**

- Adds authentication tokens to requests
- Handles token expiration
- Manages authentication errors
- Implements retry logic for failed requests

---

## 9. Validators and Pipes

### 9.1 Custom Validators

#### Match Password Validator

**Path**: `validators/match-password.validator.ts`

Custom form validator for password confirmation matching.

**Features:**

- Password confirmation validation
- Real-time validation feedback
- Form error state management
- Reusable validation logic

#### Reason Validator

**Path**: `validators/reason-validator.validator.ts`

Custom validator for leave request reasons and form text validation.

### 9.2 Custom Pipes

#### Shift Time Pipe

**Path**: `pipe/shift-time.pipe.ts`

Custom pipe for formatting shift time displays and calculations.

**Features:**

- Time format standardization
- Duration calculations
- Display formatting
- Timezone handling

---

## 10. Routing Structure

### 10.1 Main Application Routes

**Path**: `app.routes.ts`

Core application routing configuration with lazy loading.

```typescript
export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./landing-page/landing-page.component"),
  },
  {
    path: "login",
    title: "Chronos - Employee Login",
    loadComponent: () => import("./landing-page/employee-login-page/employee-login-page.component"),
  },
  {
    path: "employee-section/:uuid",
    canActivate: [authGuard],
    loadComponent: () => import("./landing-page/employee-section/employee-section.component"),
    loadChildren: () => import("./routes/employee-section.routes"),
  },
  {
    path: "manager-section/:uuid",
    canActivate: [authGuard],
    loadComponent: () => import("./landing-page/manager-section/manager-section.component"),
    loadChildren: () => import("./routes/manager-section.routes"),
  },
];
```

### 10.2 Employee Section Routes

**Path**: `routes/employee-section.routes.ts`

Employee-specific route configuration with feature-based organization.

**Route Structure:**

- `/dashboard` - Employee dashboard
- `/attendance` - Attendance management
- `/leave-requests` - Leave request management
- `/shift-management` - Shift scheduling
- `/user-profile` - Profile management

### 10.3 Manager Section Routes

**Path**: `routes/manager-section.routes.ts`

Manager-specific route configuration with administrative features.

**Route Structure:**

- `/dashboard` - Manager dashboard
- `/attendance` - Team attendance oversight
- `/leave-requests` - Leave request approvals
- `/shift-management` - Team shift management
- `/report-analytics` - Reporting and analytics
- `/user-profile` - Manager profile management

---

## 📈 Performance Considerations

### Lazy Loading Implementation

The application implements comprehensive lazy loading at multiple levels:

- **Route Level**: Major sections loaded on demand
- **Component Level**: Heavy components loaded asynchronously
- **Service Level**: Services instantiated when needed

### State Management

- **RxJS Observables**: Reactive state management
- **Service-Based State**: Centralized data management
- **Local Storage**: Authentication state persistence

### Bundle Optimization

- **Tree Shaking**: Unused code elimination
- **AOT Compilation**: Ahead-of-time compilation
- **Minification**: Production build optimization
- **Code Splitting**: Logical feature separation

---

## 🔒 Security Implementation

### Authentication Security

- **JWT Token Management**: Secure token handling
- **Route Guards**: Protected route access
- **Role-Based Access Control**: Feature-level permissions
- **Session Management**: Secure session handling

### Data Security

- **Input Validation**: Form validation and sanitization
- **HTTP Interceptors**: Request/response security
- **Environment Configuration**: Secure configuration management
- **Error Handling**: Secure error management

---

## 🧪 Testing Strategy

### Unit Testing

- **Component Testing**: Individual component validation
- **Service Testing**: Business logic verification
- **Guard Testing**: Route protection validation
- **Pipe Testing**: Custom pipe functionality

### Testing Tools

- **Karma**: Test runner
- **Jasmine**: Testing framework
- **Faker.js**: Mock data generation
- **TestBed**: Angular testing utilities

---

## 🚀 Deployment Considerations

### Build Configuration

- **Development Build**: Debug-enabled version
- **Production Build**: Optimized for performance
- **Environment Configuration**: Environment-specific settings
- **Asset Optimization**: Image and resource optimization

### Performance Monitoring

- **Bundle Analysis**: Build size monitoring
- **Runtime Performance**: Application performance tracking
- **Error Tracking**: Production error monitoring
- **User Analytics**: Usage pattern analysis

---

This documentation provides a comprehensive overview of the Chronos Employee Leave and Attendance Management System codebase. Each section includes detailed information about the purpose, functionality, and implementation details of the various components, services, and modules that make up this enterprise-grade Angular application.
