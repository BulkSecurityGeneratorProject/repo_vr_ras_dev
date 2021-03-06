/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RasvetaTestModule } from '../../../test.module';
import { PrijavaMaterijalDialogComponent } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal-dialog.component';
import { PrijavaMaterijalService } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal.service';
import { PrijavaMaterijal } from '../../../../../../main/webapp/app/entities/prijava-materijal/prijava-materijal.model';
import { MaterijalTipService } from '../../../../../../main/webapp/app/entities/materijal-tip';
import { PrijavaIntervencijaService } from '../../../../../../main/webapp/app/entities/prijava-intervencija';

describe('Component Tests', () => {

    describe('PrijavaMaterijal Management Dialog Component', () => {
        let comp: PrijavaMaterijalDialogComponent;
        let fixture: ComponentFixture<PrijavaMaterijalDialogComponent>;
        let service: PrijavaMaterijalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RasvetaTestModule],
                declarations: [PrijavaMaterijalDialogComponent],
                providers: [
                    MaterijalTipService,
                    PrijavaIntervencijaService,
                    PrijavaMaterijalService
                ]
            })
            .overrideTemplate(PrijavaMaterijalDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrijavaMaterijalDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrijavaMaterijalService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrijavaMaterijal(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.prijavaMaterijal = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prijavaMaterijalListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrijavaMaterijal();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.prijavaMaterijal = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'prijavaMaterijalListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
