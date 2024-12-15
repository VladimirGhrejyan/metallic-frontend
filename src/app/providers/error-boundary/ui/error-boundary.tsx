import { Component, ErrorInfo, ReactNode, Suspense } from 'react';

interface IProps {
    children: ReactNode;
}

interface IState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (import.meta.env.DEV) {
            console.error(error, errorInfo, 'ERROR');
        }
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <Suspense fallback="loading...">
                    <h1>ERROR</h1>
                </Suspense>
            );
        }

        return children;
    }
}
