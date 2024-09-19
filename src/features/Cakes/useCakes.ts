import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getCakes } from "@/services/apiCakes";

export function useCakes() {
    const [searchParams] = useSearchParams();
    const { cakeId } = useParams();

    const filterRange = searchParams.get("price");
    const filterRangeObj = !filterRange
        ? null
        : {
            field: "price",
            value: filterRange,
        };

    const filterRating = searchParams.get("rating");
    const filterRatingObj = !filterRating
        ? null
        : { field: "rating", value: filterRating };

    const filterType = searchParams.get("type");
    const filterTypeObj = !filterType
        ? null
        : {
            field: "type",
            value: filterType,
        };

    const filterSortBy = searchParams.get("sort-by");
    const filterSortByObj = !filterSortBy
        ? null
        : {
            field: "sort-by",
            value: filterSortBy,
        };

    const getDetails = cakeId;
    const getDetailsId = !getDetails ? null : getDetails;

    const { data: cakeItems, isLoading } = useQuery({
        queryKey: [
            "cakes",
            filterRatingObj,
            filterTypeObj,
            filterSortByObj,
            filterRangeObj,
            getDetailsId,
        ],
        queryFn: () =>
            getCakes({
                filterRatingObj,
                filterTypeObj,
                filterSortByObj,
                filterRangeObj,
                getDetailsId,
            }),
    });

    return { cakeItems, isLoading };
}
