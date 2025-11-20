import { Router } from "@angular/router";
import { AuthService } from "./auth.service"
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthService', () => {
    let service: AuthService;
    let router: Router;

    const storedUser = {
        uuid: 'abc-123',
        email: 'e@test.com',
        role: 'EMPLOYEE',
        employeeId: 'EMP-09',
        token: 'token-xyz'
    };

    beforeEach(() => {
        localStorage.setItem('auth', JSON.stringify(storedUser));

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.stub();
    });

    afterEach(() => {
        localStorage.clear();
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should read token from stored user', () => {
        expect(service.getToken()).toBe('token-xyz');
    });

    it('should report authenticated when user exists', () => {
        expect(service.isAuthenticated()).toBeTrue();
    });

    it('should be logout, clear local storage and navigate home', () => {
        service.logout();
        expect(localStorage.getItem('auth')).toBeNull();
        expect(service.isAuthenticated()).toBeFalse();
        expect(router.navigate).toHaveBeenCalledWith([''], { replaceUrl: true });
    });
});