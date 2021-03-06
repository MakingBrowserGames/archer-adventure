import { BaseScene } from "./base-scene";
import { SCENE_KEYS } from "../constants/scene-keys";
import { TextComponent } from "../components/text-component";
import { TextIndicatorComponent } from "../components/text-indicator-component";
import { IndicatorSide } from "../lib/indicator";
import { MenuSystem } from "../systems/menu-system";
import { MenuActionComponent } from "../components/menu-action-component";

export class TitleScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.title });
  }

  init() {
    this.phecs.phEntities.registerPrefab('menuTitle', {
      components: [
        TextComponent,
      ]
    });

    this.phecs.phEntities.registerPrefab('menuButton', {
      components: [
        TextComponent,
        TextIndicatorComponent,
        MenuActionComponent,
      ]
    });

    this.phecs.phSystems.registerSystems([MenuSystem]);
  }

  create() {
    this.add.image(0, 0, 'title-screen').setOrigin(0, 0);
    this.add.image(0, 0, 'vignette-effect').setOrigin(0, 0).setAlpha(0.1);

    this.phecs.phEntities.createPrefab('menuTitle', {
      x: 400,
      y: 160,
      origin: 0.5,
      font: 'compass-72-title',
      text: 'Archer Adventure',
    });

    this.createMenuButtons();

    this.phecs.start();
    this.controls.start();
  }

  private createMenuButtons() {
    const buttonConfigs = [
      {
        text: 'Continue Game',
        menuActionDisabled: !this.persistence.hasSaveGame(),
        menuActionCallback: () => {
          this.phecs.stop();
          this.scene.stop();
          this.scene.start(SCENE_KEYS.continueGame);
        }
      },
      {
        text: 'New Game',
        menuActionCallback: () => {
          this.phecs.stop();
          this.scene.stop();
          this.scene.start(SCENE_KEYS.newGame);
        }
      }
    ]

    const x = 400;
    let y = 250;
    const yStep = 40;

    buttonConfigs.map(buttonConfig => {
      const menuButton = this.phecs.phEntities.createPrefab('menuButton', {
        x,
        y,
        origin: 0.5,
        font: 'compass-24',
        text: buttonConfig.text,
        indicatorSide: IndicatorSide.LEFT,
        menuActionDisabled: buttonConfig.menuActionDisabled,
        menuActionCallback: buttonConfig.menuActionCallback,
      });

      if (buttonConfig.menuActionDisabled) {
        menuButton.getComponent(TextComponent).bitmapText.alpha = 0.5;
      }

      y += yStep;
    });
  }
}