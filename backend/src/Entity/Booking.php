<?php

namespace App\Entity;

use App\Repository\BookingRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=BookingRepository::class)
 *  @ApiResource(
 *     normalizationContext={"groups"={"booking:read"}},
 *     denormalizationContext={"groups"={"booking:write"}},
 * collectionOperations = {
"post_new_booking" = {
                "method" = "POST",
                "path" = "/new-booking",
                "route_name"="new_booking",
                "openapi_context" = {
                    "requestBody" = {
                        "content" = {
                            "application/x-www-form-urlencoded" = {
                                "schema"  = {
                                    "type"       = "object",
                                    "properties" =
                                    {
                                        "placesNumber"    = {"type" = "integer"},
                                        "idUser"    = {"type" = "integer"},
                                        "idRide"    = {"type" = "integer"},
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }
 * )
 */
class Booking
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"booking:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Groups({"booking:read", "booking:write"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $bookingDate;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"booking:read", "booking:write"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $placesNumber;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"booking:read", "booking:write"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Ride::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"booking:read", "booking:write"})
     */
    private $ride;



    public function __construct()
    {
        $this->bookingDate = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBookingDate(): ?\DateTimeInterface
    {
        return $this->bookingDate;
    }

    public function setBookingDate(\DateTimeInterface $bookingDate): self
    {
        $this->bookingDate = $bookingDate;

        return $this;
    }

    public function getPlacesNumber(): ?int
    {
        return $this->placesNumber;
    }

    public function setPlacesNumber(int $placesNumber): self
    {
        $this->placesNumber = $placesNumber;

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

    public function getRide(): ?Ride
    {
        return $this->ride;
    }

    public function setRide(?Ride $ride): self
    {
        $this->ride = $ride;

        return $this;
    }

}
