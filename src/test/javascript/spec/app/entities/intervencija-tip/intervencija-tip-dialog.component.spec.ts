/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { IntervencijaTipDialogComponent } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip-dialog.component';
import { IntervencijaTipService } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip.service';
import { IntervencijaTip } from '../../../../../../main/webapp/app/entities/intervencija-tip/intervencija-tip.model';
import { JedMereService } from '../../../../../../main/webapp/app/entities/jed-mere';

describe('Component Tests', () => {

    describe('IntervencijaTip Management Dialog Component', () => {
        let comp: IntervencijaTipDialogComponent;
        let fixture: ComponentFixture<IntervencijaTipDialogComponent>;
        let service: IntervencijaTipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [IntervencijaTipDialogComponent],
                providers: [
                    JedMereService,
                    IntervencijaTipService
                ]
            })
            .overrideTemplate(IntervencijaTipDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervencijaTipDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervencijaTipService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IntervencijaTip(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.intervencijaTip = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'intervencijaTipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IntervencijaTip();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.intervencijaTip = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'intervencijaTipListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
