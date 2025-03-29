import { Link, LinkBaseProps } from '@mui/material';
import { LinkComponent, createLink } from '@tanstack/react-router';
import * as React from 'react';

interface MUILinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> {}

const MUILinkComponent = React.forwardRef<HTMLAnchorElement, LinkBaseProps & MUILinkProps>(
    (props, ref) => {
        return <Link component={'a'} ref={ref} {...props} />;
    },
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const MuiCustomLink: LinkComponent<typeof MUILinkComponent> = (props) => {
    return <CreatedLinkComponent preload={'intent'} {...props} />;
};
