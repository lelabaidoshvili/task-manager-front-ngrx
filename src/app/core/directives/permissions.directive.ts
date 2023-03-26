import {
  Directive,
  Input,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { first } from 'rxjs';

import { AuthFacadeService } from '../../pages/auth/auth-facade.service';

@Directive({
  selector: '[appPermissions]',
  standalone: true,
})
export class PermissionsDirective implements AfterViewInit {
  @Input() appPermissions: string[] = [];

  constructor(
    private authFacadeService: AuthFacadeService,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef
  ) {}

  // hasPermission(): boolean {
  //   this.authFacadeService.permissions$.subscribe((res) => {
  //     this.userPermissions = res;
  //   });

  //   return this.userPermissions.some((permission) =>
  //     this.appPermissions.includes(permission)
  //   );
  // }
  ngOnInit() {
    const permissionsString = localStorage.getItem('permissions');
    if (permissionsString) {
      const permissions = JSON.parse(permissionsString);
      this.authFacadeService.permissionsSubject.next(permissions);
    }
  }

  ngAfterViewInit(): void {
    this.authFacadeService.permissionsSubject.subscribe(
      (permissions: string[]) => {
        const userPermissions = permissions.some((permission) =>
          this.appPermissions.includes(permission)
        );
        if (!userPermissions) {
          this.elementRef.nativeElement.classList.add('hidden');
        } else {
          this.elementRef.nativeElement.classList.remove('hidden');
        }
        this.cdr.detectChanges();
        // setTimeout(() => {
        // });
        console.log(this.elementRef.nativeElement);
        console.log(userPermissions);
      }
    );
  }
}

//--
