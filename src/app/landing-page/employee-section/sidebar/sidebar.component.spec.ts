import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../shared/services/auth.service';

describe('SidebarComponent', () => {
  const authMock = { logout: jasmine.createSpy('logout') };

  beforeEach(() => {
    localStorage.setItem('auth', JSON.stringify({
      uuid: 'u-1', employeeId: 'EMP-1', role: 'EMPLOYEE', email: 'e@test.com'
    }));

    TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authMock }]
    });
  });

  afterEach(() => localStorage.clear());

  it('should create and read user from localStorage', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.eachEmployee()).not.toBeNull();
  });

  it('should call logout on click', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    component.onLogout();
    expect(authMock.logout).toHaveBeenCalled();
  });
});