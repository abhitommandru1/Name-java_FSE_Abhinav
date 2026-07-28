import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { unsavedChangesGuard, HasUnsavedChanges } from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {
  const executeGuard: CanDeactivateFn<HasUnsavedChanges> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => unsavedChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('allows navigation when there are no unsaved changes', () => {
    const component: HasUnsavedChanges = { hasUnsavedChanges: () => false };
    const result = executeGuard(component, null as any, null as any, null as any);
    expect(result).toBeTrue();
  });

  it('asks for confirmation when there are unsaved changes', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const component: HasUnsavedChanges = { hasUnsavedChanges: () => true };

    const result = executeGuard(component, null as any, null as any, null as any);

    expect(window.confirm).toHaveBeenCalled();
    expect(result).toBeTrue();
  });
});
