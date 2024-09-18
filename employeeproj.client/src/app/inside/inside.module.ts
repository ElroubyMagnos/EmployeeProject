import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { ProgramComponent } from './program/program.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { SummaryComponent } from './summary/summary.component';
import { DecisionComponent } from './decision/decision.component';
import { RouterModule } from '@angular/router';
import { ParticlesModule } from "../particles/particles.module";
import { FormsModule } from '@angular/forms';
import { issigninGuard } from '../statichome/guards/issignin.guard';



@NgModule({
  declarations: [
    DetailsComponent,
    ProgramComponent,
    EvaluationComponent,
    SummaryComponent,
    DecisionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'details', component: DetailsComponent, canActivate: [issigninGuard] },
        { path: 'program', component: ProgramComponent, canActivate: [issigninGuard] },
        { path: 'evaluation/:id', component: EvaluationComponent, canActivate: [issigninGuard] },
        { path: 'summary/:id', component: SummaryComponent, canActivate: [issigninGuard] },
        { path: 'decision', component: DecisionComponent, canActivate: [issigninGuard] }
    ]),
    ParticlesModule,
    FormsModule
]
})
export class InsideModule { }
