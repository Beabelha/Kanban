import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/model/tag';
import { TagsService } from 'src/app/services/tags.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags: Array<Tag>;
  colunas = ['nome', 'acoes'];
  tagSelecionada: Tag;
  inserindo = false;

  constructor(private tagService: TagsService, private location: Location) { }

  ngOnInit(): void {
    this.atualizarTag();
  }

  voltar() {
    this.location.back();
}

  atualizarTag() {
    this.tags = this.tagService.listarTag();
  }

  tagSelect(tags: Tag) {
    this.tagSelecionada = tags;
    this.inserindo = true;
  }

  novaTag() {
    this.inserindo = false;
    this.tagSelecionada = new Tag();
  }

  cancelar() {
    this.tagSelecionada = null;
  }

  salvar() {
    if (this.tagSelecionada.nome) {
      if (this.inserindo) {
        this.tagService.editarTag(this.tagSelecionada);
      } else {
        this.tagService.inserirTag(this.tagSelecionada);
      }
      this.cancelar();
      this.atualizarTag();
    } else {
      alert('Nome obrigatorio');
    }

  }

  remover(id: number) {
    this.tagService.remover(id);
    this.atualizarTag();
  }

}
