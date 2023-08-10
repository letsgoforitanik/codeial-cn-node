import { passport } from '@config';

export default function authenticate(strategy: string = 'local') {
    return passport.authenticate(strategy, { failWithError: });
}