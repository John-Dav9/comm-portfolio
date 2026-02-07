import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesAdmin } from './articles-admin';

describe('ArticlesAdmin', () => {
  let component: ArticlesAdmin;
  let fixture: ComponentFixture<ArticlesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
