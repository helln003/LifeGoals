import { Component, OnInit } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  metas: Meta[] = [];
  nuevaMeta: string = '';

  constructor(private metaService: MetaServiceService) {}

  ngOnInit(): void {
    this.metaService.getMetas().subscribe((data) => {
      this.metas = data;
    });
  }

  agregarMeta(): void {
    if (this.nuevaMeta.trim() === '') return;
    this.metaService.addMeta(this.nuevaMeta.trim()).then(() => {
      this.nuevaMeta = '';
    });
  }

  eliminarMeta(id: string | undefined): void {
    if (!id) return;
    this.metaService.deleteMeta(id);
  }
}
