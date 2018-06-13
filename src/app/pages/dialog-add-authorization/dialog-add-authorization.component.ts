import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlattener, MatTreeFlatDataSource} from '@angular/material/tree';
import {of as ofObservable, Observable, BehaviorSubject} from 'rxjs';


/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange: BehaviorSubject<TodoItemNode[]> = new BehaviorSubject<TodoItemNode[]>([]);
  courses: any[] = [];
  students: any[] = [];
  studentsAux: any[] = [];
  coursesAux: any[] = [];

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor(private http: HttpUsingFormDataService) {
    this.getCourses();
    // this.initialize();
  }

  initialize(courses) {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const DATA = {
      'Todos':
        courses
    };
    const data = this.buildFileTree(DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

    getCourses() {
      this.http.get('/centres/' + 1 + '/courses').subscribe((resp: any) => {
        if (resp.content) {
          for (let i = 0; i < resp.content.courses.length; i++) {
            this.courses.push(resp.content.courses[i].name);
          }
          this.getStudents(this.courses);
        }
      });
  }

  getStudents(courses) {
    this.http.get('/centres/' + 1 + '/students').subscribe((resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.students.length; i++) {
          this.students.push({id: resp.content.students[i].id,
            name: resp.content.students[i].name + ' ' + resp.content.students[i].surname,
            course: resp.content.students[i].course.name});
        }
        this.union(courses, this.students);
      }
    });
  }

  union(courses, students) {
    for (let i = 0; i < courses.length; i++) {
      for (let j = 0; j < students.length; j++) {
        if (courses[i] === students[j].course) {
          this.studentsAux[students[j].id] = students[j].name;
        }
      }
      this.coursesAux[courses[i]] = this.studentsAux;
      this.studentsAux = [];
    }
    this.initialize(this.coursesAux);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(value: any, level: number) {
    let data: any[] = [];
    for (let k in value) {
      let v = value[k];
      let node = new TodoItemNode();
      node.item = `${k}`;
      if (v === null || v === undefined) {
        // no action
      } else if (typeof v === 'object') {
        node.children = this.buildFileTree(v, level + 1);
      } else {
        node.item = v;
      }
      data.push(node);
    }
    return data;
  }
}

@Component({
  selector: 'app-dialog-add-authorization',
  templateUrl: './dialog-add-authorization.component.html',
  styleUrls: ['./dialog-add-authorization.component.css'],
  providers: [ChecklistDatabase]

})
export class DialogAddAuthorizationComponent implements OnInit {

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap: Map<TodoItemFlatNode, TodoItemNode> = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap: Map<TodoItemNode, TodoItemFlatNode> = new Map<TodoItemNode, TodoItemFlatNode>();

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);


  sendAuthorizationForm: FormGroup;
  students: any[] = [];
  keysFirstLevel: any[] = [];
  keySecondLevel: any;
  fileToUpload: any;
  nameFile: any;
  submit: boolean;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogAddAuthorizationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
              private database: ChecklistDatabase) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.submit = true;

    database.dataChange.subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: TodoItemFlatNode) => { return node.level; };

  isExpandable = (node: TodoItemFlatNode) => { return node.expandable; };

  getChildren = (node: TodoItemNode): Observable<TodoItemNode[]> => {
    return ofObservable(node.children);
  }

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => { return _nodeData.expandable; };

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    let flatNode = this.nestedNodeMap.has(node) && this.nestedNodeMap.get(node)!.item === node.item
      ? this.nestedNodeMap.get(node)!
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }


  ngOnInit() {
    this.sendAuthorizationForm = this.formBuilder.group({
      subject: ['', Validators.required],
      limitDate: ['', Validators.required],
      centre: [''],
      message: [''],
      studentsIds: ['']
    });
  }

  add() {
    const formData = new FormData();
    const sendingDate = new Date();
    this.sendAuthorizationForm['studentsIds'] = this.students;
    formData.append('file', this.fileToUpload, this.fileToUpload != null ? this.fileToUpload.name : null);
    formData.append('centre', this.data.idCentre);
    formData.append('subject', this.sendAuthorizationForm['subject']);
    formData.append('message', this.sendAuthorizationForm['message']);
    formData.append('limitDate', this.sendAuthorizationForm['limitDate'].getFullYear() + '-'
      + (this.sendAuthorizationForm['limitDate'].getMonth() + 1) + '-'
      + this.sendAuthorizationForm['limitDate'].getDate());
    formData.append('sendingDate', sendingDate.getFullYear() + '-'
      + (sendingDate.getMonth() + 1) + '-'
      + sendingDate.getDate());
    formData.append('studentsIds', this.sendAuthorizationForm['studentsIds']);

    this.http.postFile('/authorizations', formData).subscribe((resp: any) => {
            if (resp.success) {
              this.toastr.success('', 'Autorización enviada correctamente' , {positionClass : 'toast-bottom-right'});
              this.onNoClick(resp.content.authorizations);
            } else {
              this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
            }
          },
          error => this.toastr.error('Ha ocurrido un problema al intentar enviar la autorización', 'Error', { positionClass : 'toast-bottom-right'})
        );
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.nameFile = this.fileToUpload.name;
  }

  checkNode(node, event) {

    // condiciones de true o false segun el checked
    if (node.level === 0) {
      if (event.checked) {
        this.students = [];
        Object.entries(this.database.coursesAux).forEach(([key, value]) => {
          Object.keys(value).forEach(keys => {
            this.students.push(keys);
          });
        });
      } else {
        this.students = [];
      }

    } else if (node.level === 1) {
      if (event.checked) {
        Object.entries(this.database.coursesAux).forEach(([key, value]) => {
          if (key === node.item) {
            Object.keys(value).forEach(keys => {
              this.students.push(keys);
            });
          }
        });
      } else {
        this.keysFirstLevel = [];
        Object.entries(this.database.coursesAux).forEach(([key, value]) => {
          if (key === node.item) {
            Object.keys(value).forEach(keys => {
              this.keysFirstLevel.push(keys);
            });
            this.keysFirstLevel.forEach(values => {
              const index = this.students.indexOf(values);
              this.students.splice(index, 1);
            });
          }
        });
      }

    } else if (node.level === 2) {
      if (event.checked) {
        Object.entries(this.database.coursesAux).forEach(([key, value]) => {
          Object.entries(value).forEach(([keys, values]) => {
            if (values === node.item) {
              this.students.push(keys);
            }
          });
        });
      } else {
        this.keySecondLevel = null;
        Object.entries(this.database.coursesAux).forEach(([key, value]) => {
          Object.entries(value).forEach(([keys, values]) => {
            if (values === node.item) {
              this.keySecondLevel = keys;
              const index = this.students.indexOf(this.keySecondLevel);
              this.students.splice(index, 1);
            }
          });
        });
      }
    }

    if (this.students.length === 0) {
      this.submit = false;
    } else {
      this.submit = true;
    }
    console.log(this.submit);
    console.log(this.students);
  }

  onNoClick(authorization): void {
    this.dialogRef.close(authorization);
  }

}
