import { baseCrouch } from './base-crouch';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerCrouchRight: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseCrouch, {
  id: 'adventurer-crouch-right',
  onEnter(entity: Phecs.Entity) {
    entity.components[SpriteComponent.tag].sprite.flipX = false;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.left,
      to: 'adventurer-crouch-left'
    }
  ]
});
