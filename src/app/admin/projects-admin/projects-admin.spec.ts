import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAdmin } from './projects-admin';

describe('ProjectsAdmin', () => {
  let component: ProjectsAdmin;
  let fixture: ComponentFixture<ProjectsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
