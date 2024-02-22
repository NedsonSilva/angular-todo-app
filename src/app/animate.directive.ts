import { animate, AnimationBuilder, AnimationPlayer, style, transition } from '@angular/animations';
import { ChangeDetectorRef, Directive, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[animate]' })
export class AnimateDirective implements OnInit {
    original: HTMLElement;
    copy: HTMLElement;
    timing: string;
    private _player: AnimationPlayer;

    @Input() set animate(value: string) {
        this.timing = value || '450ms ease-in-out';
    }
    @Input('animatePos0') animatePos0: boolean = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private builder: AnimationBuilder,
        private renderer: Renderer2,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.original = this.viewContainer.createEmbeddedView(
            this.templateRef
        ).rootNodes[0];


        setTimeout(() => {
            this.copy = this.viewContainer.createEmbeddedView(
                this.templateRef
            ).rootNodes[0];

            const parentRect = this.original.parentElement.getBoundingClientRect();

            this.renderer.setStyle(this.original, 'visibility', 'hidden');

            const rect = {
                top: this.animatePos0 ? this.original.parentElement.clientTop : 0,
                left: this.animatePos0 ? this.original.offsetLeft : 0
            }

            this._setStyle('position', 'absolute');
            this._setStyle('top', rect.top + this.original.parentElement.clientTop + 'px')
            this._setStyle('left', rect.left + window.scrollX + 'px')
            this._setStyle('right', rect.left + window.scrollX + 'px')

            setTimeout(() => this.animateGo(false))
        });
    }

    private _setStyle(style: string, value: string) {
        this.renderer.setStyle(this.copy, style, value);
    }

    animateGo(isAnimate = true) {
        setTimeout(() => {
            const rect = {
                top: this.original.offsetTop,
                left: this.original.offsetLeft,
            };
            const animation = this.builder.build([
                animate(
                    isAnimate ? this.timing : '0s',
                    style({
                        top: rect.top + this.original.parentElement.clientTop,
                        left: rect.left + window.scrollX,
                    }),
                ),
            ]);
            this._player = animation.create(this.copy);
            this._player.play();
            this.changeDetectorRef.detectChanges();
        });
    }
}
