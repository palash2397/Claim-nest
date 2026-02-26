import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { VALID_NOTE_TYPES, VALID_NOTE_VISIBILITY } from '../enums/case-note.enum';

@ValidatorConstraint({ name: 'isValidNoteType', async: false })
export class IsValidNoteType implements ValidatorConstraintInterface {
  validate(text: string) {
    // Accept case-insensitive variations and normalize to correct format
    const normalizedInput = text?.trim();
    const found = VALID_NOTE_TYPES.find(type => 
      type.toLowerCase() === normalizedInput.toLowerCase()
    );
    return !!found;
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid note type. Valid types are: ${VALID_NOTE_TYPES.join(', ')}`;
  }
}

@ValidatorConstraint({ name: 'isValidVisibility', async: false })
export class IsValidVisibility implements ValidatorConstraintInterface {
  validate(text: string) {
    // Accept case-insensitive variations and normalize to correct format
    const normalizedInput = text?.trim();
    const found = VALID_NOTE_VISIBILITY.find(visibility => 
      visibility.toLowerCase() === normalizedInput.toLowerCase()
    );
    return !!found;
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid visibility. Valid options are: ${VALID_NOTE_VISIBILITY.join(', ')}`;
  }
}
