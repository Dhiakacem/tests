<?php

namespace App\Entity;

use App\Repository\RideRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=RideRepository::class)
 * @ApiResource(
 *      normalizationContext={"groups"={"ride:read","booking:read"}},
 *     denormalizationContext={"groups"={"ride:write","booking:write"}},            
 * )
 * @ApiFilter(SearchFilter::class, properties={"departurePoint": "iexact", "arrivalPoint": "iexact", "places": "iexact"})
 * @ApiFilter(DateFilter::class, properties={"departureTime"})
 * @ApiFilter(OrderFilter::class, properties={"price"})
 * @ORM\HasLifecycleCallbacks()
 */
class Ride
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"ride:read","booking:read","booking:write"})
     */
    private $id;
      /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"ride:read", "ride:write"})
     */
    private $departurePoint;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"ride:read", "ride:write"})
     */
    private $arrivalPoint;
      /**
     * @ORM\Column(type="datetime")
     * @Groups({"ride:read", "ride:write"})
     */
    private $departureTime;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"ride:read", "ride:write"})
     */
    private $arrivalTime;

    /**
     * @ORM\Column(type="float")
     * @Groups({"ride:read", "ride:write"})
     */
    private $price;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"ride:read", "ride:write"})
     */
    private $places;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="rides")
     * @Groups({"ride:read", "ride:write"})
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="ride")
     * @Groups({"ride:read"})
     */
    private $reviews;

    /**
     * @ORM\ManyToOne(targetEntity=Status::class, inversedBy="rides")
     * @Groups({"ride:read", "ride:write"})
     */
    private $status;

    /**
     * @ORM\ManyToMany(targetEntity=Option::class, mappedBy="ride")
     * @Groups({"ride:read", "ride:write"})
     */
    private $options;

    /**
     * @ORM\OneToMany(targetEntity=Booking::class, mappedBy="ride")
     */
    private $bookings;

    /**
     * @ORM\Column(type="integer")
     */
    private $placeDispo;


  

  

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
        $this->options = new ArrayCollection();
        $this->bookings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

 

    

     

    public function getArrivalPoint(): ?string
    {
        return $this->arrivalPoint;
    }

    public function setArrivalPoint(string $arrivalPoint): self
    {
        $this->arrivalPoint = $arrivalPoint;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPlaces(): ?int
    {
        return $this->places;
    }

    public function setPlaces(int $places): self
    {
        $this->places = $places;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setRide($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getRide() === $this) {
                $review->setRide(null);
            }
        }

        return $this;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(?Status $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection<int, Option>
     */
    public function getOptions(): Collection
    {
        return $this->options;
    }

    public function addOption(Option $option): self
    {
        if (!$this->options->contains($option)) {
            $this->options[] = $option;
            $option->addRide($this);
        }

        return $this;
    }

    public function removeOption(Option $option): self
    {
        if ($this->options->removeElement($option)) {
            $option->removeRide($this);
        }

        return $this;
    }

    public function getDepartureTime(): ?\DateTimeInterface
    {
        return $this->departureTime;
    }

    public function setDepartureTime(\DateTimeInterface $departureTime): self
    {
        $this->departureTime = $departureTime;

        return $this;
    }

    public function getArrivalTime(): ?\DateTimeInterface
    {
        return $this->arrivalTime;
    }

    public function setArrivalTime(\DateTimeInterface $arrivalTime): self
    {
        $this->arrivalTime = $arrivalTime;

        return $this;
    }

    public function getDeparturePoint(): ?string
    {
        return $this->departurePoint;
    }

    public function setDeparturePoint(string $departurePoint): self
    {
        $this->departurePoint = $departurePoint;

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): self
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings[] = $booking;
            $booking->setRide($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): self
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getRide() === $this) {
                $booking->setRide(null);
            }
        }

        return $this;
    }

    public function getPlaceDispo(): ?int
    {
        return $this->placeDispo;
    }

    public function setPlaceDispo(int $placeDispo): self
    {
        $this->placeDispo = $placeDispo;

        return $this;
    }
    
    /**
     * @ORM\PrePersist
     */
    public function setPlaceDispoValue(): void
    {
        $this->placeDispo = $this->getPlaces();
    }


}
