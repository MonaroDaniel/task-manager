interface IfProps {
    test: boolean;
    children: any
}

export default function({test, children}:IfProps) {
    if (test) {
        return children
    } else {
        return
    }
}