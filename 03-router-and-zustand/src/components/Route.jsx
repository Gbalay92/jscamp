import { useRouter } from "../hooks/useRouter";

export function Route({ path, component:  Component }) {
    const { currentPath } = useRouter();
    return currentPath === path ? <Component /> : null;
}