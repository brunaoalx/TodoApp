import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from 'src/models/todo.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public modo = 'lista';
  public tarefas: Tarefa[] = []; //tipo any é equivalente ao object do c#
  public titulo: String = 'Minhas Tarefas'; 
  public formTarefa: FormGroup;


  //É chamado sempre quando o componente é iniciado
  constructor(private fb: FormBuilder) {

    this.formTarefa = this.fb.group(
      {
        descricao: ['',Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(60),
          Validators.required
        ])]
      }
    );

    this.carregarTarefasSalvas();

  }


  remover(tarefa: Tarefa){
    const index = this.tarefas.indexOf(tarefa);

    if(index !== -1){
      this.tarefas.splice(index,1);
    }

    this.salvarLocal();
  }

  concluir(tarefa: Tarefa){
    tarefa.concluido = true;
    this.salvarLocal();
  }

  retomar(tarefa: Tarefa){
    tarefa.concluido = false;
    this.salvarLocal();
  }

  adicionar(){
    const descricaoTarefa = this.formTarefa.controls['descricao'].value;
    const id = this.tarefas.length + 1;

    this.tarefas.push(new Tarefa(id,descricaoTarefa,false));
    this.salvarLocal();
    this.clear();
  }

  clear(){
    this.formTarefa.reset();
  }

  salvarLocal(){
    const dados = JSON.stringify(this.tarefas);
    localStorage.setItem(  'tarefas',dados);
    this.modo='lista';

  }

  carregarTarefasSalvas(){
    const dados = localStorage.getItem('tarefas') || '{}';

    this.tarefas = JSON.parse(dados);
  }

  alternarModo(modoExibicao: string){
    this.modo = modoExibicao;
  }

}
