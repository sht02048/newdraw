import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../types/redux";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { useAppDispatch, useAppSelector };
