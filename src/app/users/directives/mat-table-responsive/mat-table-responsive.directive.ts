import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';

@Directive({
  selector: '[matTableResponsive]',
})
export class MatTableResponsiveDirective
  implements OnInit, AfterViewInit, OnDestroy
{
  private onDestroy$ = new Subject<boolean>();

  private thead!: HTMLTableSectionElement;
  private tbody!: HTMLTableSectionElement;

  private theadChanged$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private tbodyChanged$: Subject<boolean> = new Subject<boolean>();

  private theadObserver = new MutationObserver(() =>
    this.theadChanged$.next(true)
  );
  private tbodyObserver = new MutationObserver(() =>
    this.tbodyChanged$.next(true)
  );

  constructor(private table: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.thead = this.table.nativeElement.querySelector('thead');
    this.tbody = this.table.nativeElement.querySelector('tbody');

    this.theadObserver.observe(this.thead, {
      characterData: true,
      subtree: true,
    });
    this.tbodyObserver.observe(this.tbody, { childList: true });
  }

  ngAfterViewInit() {
    this.handleChanges();
  }

  ngOnDestroy(): void {
    this.theadObserver.disconnect();
    this.tbodyObserver.disconnect();

    this.onDestroy$.next(true);
  }

  private handleChanges(): void {
    combineLatest([this.theadChanged$, this.tbodyChanged$])
      .pipe(
        map(() => this.mapTableElements()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(
        ([columnNames, rows]: [string[], HTMLTableCellElement[][]]) => {
          rows.forEach((rowCells: HTMLTableCellElement[]) =>
            rowCells.forEach((cell: HTMLTableCellElement) => {
              this.renderer.setAttribute(
                cell,
                'data-column-name',
                columnNames[cell.cellIndex]
              );
            })
          );
        }
      );
  }

  private mapTableElements(): [string[], HTMLTableCellElement[][]] {
    const headerRow = this.thead.rows.item(0);
    const bodyRows = this.tbody.rows;
    // @ts-ignore
    const columnsName: string[] = [...headerRow.children].map(
      (headerCell) => headerCell.textContent
    );
    const rows = [...bodyRows].map(
      (row) => [...row.children] as HTMLTableCellElement[]
    );

    return [columnsName, rows];
  }
}
